const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transport, makeANiceEmail } = require("../mail");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { processUpload, loadFile, removeFile } = require("../modules/fileApi");
const { isAuthenticated } = require("../utils");
// const { hasPermission } = require("../utils");
const moment = require("moment-timezone");
require("moment/locale/de");
moment.locale("de");

const Mutations = {
  async createUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    if (args.company) {
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            company: {
              connect: {
                id: args.company
              }
            }
          }
        },
        info
      );
      return user;
    }
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args
        }
      },
      info
    );
    return user;
  },
  async createBulletpoint(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const bulletpoint = await ctx.db.mutation.createBulletpoint(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return bulletpoint;
  },
  updateUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  setUserPermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // check if we have the permission to do so
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "PERMISSIONUPDATE"].includes(permission)
    );
    if (!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }
    // run the update method
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateBulletpoint(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateBulletpoint(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteUser(parent, args, ctx, info) {
    /*if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }*/
    const where = {
      id: args.id
    };
    // find the user
    const user = await ctx.db.query.user(
      {
        where
      },
      `{ id title}`
    );
    // check if we own that user or have permissions
    //TODO
    return ctx.db.mutation.deleteUser(
      {
        where
      },
      info
    );
  },
  async deleteBulletpoint(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const where = {
      id: args.id
    };
    // find the user
    const bulletpoint = await ctx.db.query.bulletpoint(
      {
        where
      },
      `{ id title}`
    );
    // check if we own that user or have permissions
    //TODO
    return ctx.db.mutation.deleteBulletpoint(
      {
        where
      },
      info
    );
  },
  async closeBulletpoint(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // run the update method
    return ctx.db.mutation.updateBulletpoint(
      {
        data: {
          closedDate: new Date()
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteMailTemplate(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const where = {
      id: args.id
    };
    return ctx.db.mutation.deleteMailTemplate(
      {
        where
      },
      info
    );
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // trim their email
    args.email = args.email.trim();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: {
            set: ["USER", "CTRLVIEWACTIVITIES", "CTRLVIEWLOG"] // to see own activites and log
          }
        }
      },
      info
    );
    // create JWT Token for them
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.APP_SECRET
    );
    // we set jwt token as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // create the default setting
    const newSettings = await ctx.db.mutation.createSettings({
      data: {
        boardPrioCaptions: {
          set: ["Prio1", "Prio2", "Erledigt"]
        },
        themeColorPrimary: "",
        themeColorSecondary: "",
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
    // return user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    // 3. generate the JWT Token
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.APP_SECRET
    );
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 4.1 update last login
    ctx.db.mutation.updateUser({
      data: {
        lastLogin: new Date()
      },
      where: {
        id: user.id
      }
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async requestReset(parent, args, ctx, info) {
    // 1. Check if this is a real user
    const user = await ctx.db.query.user({
      where: {
        email: args.email
      }
    });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: {
        email: args.email
      },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });
    // 3. Email them that reset token
    const mailRes = await transport.sendMail({
      from: "dev@rkmail.email",
      to: user.email,
      subject: "Your Password Reset Token",
      html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
    });

    // 4. Return the message
    return { message: "Thanks!" };
  },
  async resetPassword(parent, args, ctx, info) {
    // 1. check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Yo Passwords don't match!");
    }
    // 2. check if its a legit reset token
    // 3. Check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("This token is either invalid or expired!");
    }
    // 4. Hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save the new password to the user and remove old resetToken fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 6. Generate JWT
    const token = jwt.sign(
      {
        userId: updatedUser.id
      },
      process.env.APP_SECRET
    );
    // 7. Set the JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 8. return the new user
    return updatedUser;
  },
  async createSettings(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const newSettings = await ctx.db.mutation.createSettings(
      {
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          ...args
        }
      },
      info
    );
    return newSettings;
  },
  async deleteSettings(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    return ctx.db.mutation.deleteSettings(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteMultiSettingses(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    return ctx.db.mutation.deleteManySettingses(
      {
        where: args.where
      },
      info
    );
  },
  async createMailTemplate(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const newTemplate = await ctx.db.mutation.createMailTemplate(
      {
        data: {
          subject: args.subject,
          body: args.body,
          eventType: args.eventType
        }
      },
      info
    );
    return newTemplate;
  },
  updateMailTemplate(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // first take a copy of the updates
    const updates = { ...args };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateMailTemplate(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateSettings(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateSettings(
      {
        data: {
          themeColorPrimary: updates.themeColorPrimary,
          themeColorSecondary: updates.themeColorSecondary,
          boardPrioCaptions: { set: updates.boardPrioCaptions }
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createAddress(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    const address = await ctx.db.mutation.createAddress(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return address;
  },
  async createCustomer(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    // search zip first
    let zipId = 0;
    if (args.zip) {
      const foundZips = await ctx.db.query.zipCodes(
        {
          where: {
            code: args.zip
          }
        },
        "{ id }"
      );

      if (foundZips.length > 0) {
        zipId = foundZips[0].id;
      }
    }

    if (zipId) {
      const newCustomer = await ctx.db.mutation.createCustomer(
        {
          data: {
            ...args,
            representative: {
              connect: {
                id: args.representative
              }
            },
            zip: {
              connect: {
                id: zipId
              }
            }
          }
        },
        info
      );
      return newCustomer;
    } else {
      delete args.zip;
      const newCustomer = await ctx.db.mutation.createCustomer(
        {
          data: {
            ...args,
            representative: {
              connect: {
                id: args.representative
              }
            }
          }
        },
        info
      );
      return newCustomer;
    }
  },
  async deleteCustomer(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }

    // delete all related records

    return ctx.db.mutation.deleteCustomer(
      {
        where
      },
      info
    );
  },
  createZipCode(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    return ctx.db.mutation.createZipCode(
      {
        data: {
          ...args
        }
      },
      info
    );
  },
  async createChannel(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    const channel = await ctx.db.mutation.createChannel(
      {
        data: {
          ...args
        }
      },
      info
    );
    return channel;
  },
  updateChannel(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateChannel(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteChannel(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteChannel(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createHolidays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    const holidays = await ctx.db.mutation.createHolidays(
      {
        data: {
          ...args
        }
      },
      info
    );
    return holidays;
  },
  updateHolidays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateHolidays(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteHolidays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteHolidays(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createNameDay(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    const nameday = await ctx.db.mutation.createNameDays(
      {
        data: {
          ...args
        }
      },
      info
    );
    return nameday;
  },
  updateNameDays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateNameDays(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteNameDays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteNameDays(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    const newContent = await ctx.db.mutation.createContent(
      {
        data: {
          ...args,
          channel_content: {
            connect: [...args.channel_content.map(id => ({ id }))]
          },
          responsible: {
            connect: {
              id: args.responsible
            }
          }
        }
      },
      info
    );
    return newContent;
  },
  updateContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    if (updates.channel_content) {
      return ctx.db.mutation.updateContent(
        {
          data: {
            ...updates,
            channel_content: {
              connect: [...updates.channel_content.map(id => ({ id }))]
            },
            responsible: {
              connect: {
                id: args.responsible
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    } else {
      return ctx.db.mutation.updateContent(
        {
          data: {
            ...updates,
            responsible: {
              connect: {
                id: args.responsible
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    }
  },
  async deleteContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteContent(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createChannelContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    const newChannelContent = await ctx.db.mutation.createChannelContent(
      {
        data: {
          ...args,
          channel: {
            connect: {
              id: args.channel
            }
          },
          content: {
            connect: {
              id: args.content
            }
          }
        }
      },
      info
    );
    return newChannelContent;
  },
  updateChannelContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // run the update method
    if (updates.channel && updates.content) {
      return ctx.db.mutation.updateChannelContent(
        {
          data: {
            ...updates,
            channel: {
              connect: {
                id: updates.channel
              }
            },
            content: {
              connect: {
                id: updates.content
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    }
    if (updates.channel && !updates.content) {
      return ctx.db.mutation.updateChannelContent(
        {
          data: {
            ...updates,
            channel: {
              connect: {
                id: updates.channel
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    }
    if (!updates.channel && updates.content) {
      return ctx.db.mutation.updateChannelContent(
        {
          data: {
            ...updates,
            content: {
              connect: {
                id: updates.content
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    }
  },
  async deleteChannelContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteChannelContent(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createCompany(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    if (args.zip) {
      // search zip first
      let zipId = 0;
      if (args.zip) {
        const foundZips = await ctx.db.query.zipCodes(
          {
            where: {
              code: args.zip
            }
          },
          "{ id }"
        );

        if (foundZips.length > 0) {
          zipId = foundZips[0].id;
        }
      }
      if (zipId) {
        const newCompany = await ctx.db.mutation.createCompany(
          {
            data: {
              ...args,
              zip: {
                connect: {
                  id: zipId
                }
              }
            }
          },
          info
        );
        return newCompany;
      } else {
        let updates = { ...args };
        delete updates.zip;
        const newCompany = await ctx.db.mutation.createCompany(
          {
            data: {
              ...updates
            }
          },
          info
        );
        return newCompany;
      }
    }
    const newCompany = await ctx.db.mutation.createCompany(
      {
        data: {
          ...args
        }
      },
      info
    );
    return newCompany;
  },
  async updateCompany(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    // first take a copy of the updates
    const updates = {
      ...args
    };
    // remove the id from the updates
    delete updates.id;
    // search zip first
    let zipId = 0;
    if (args.zip) {
      const foundZips = await ctx.db.query.zipCodes(
        {
          where: {
            code: args.zip
          }
        },
        "{ id }"
      );

      if (foundZips.length > 0) {
        zipId = foundZips[0].id;
      }
    }
    // run the update method
    if (zipId) {
      return ctx.db.mutation.updateCompany(
        {
          data: {
            ...updates,
            zip: {
              connect: {
                id: zipId
              }
            }
          },
          where: {
            id: args.id
          }
        },
        info
      );
    }
    return ctx.db.mutation.updateCompany(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteCompany(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.mutation.deleteCompany(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async uploadFile(parent, { file }, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    return await processUpload(file, ctx, info);
  },

  async uploadFiles(parent, { files }, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    return Promise.all(files.map(file => processUpload(file, ctx, info)));
  },

  async renameFile(parent, { id, name }, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    return ctx.db.mutation.updateFile({ data: { name }, where: { id } }, info);
  },

  async deleteFile(parent, { id }, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    // get file to have url
    const fileEntry = await ctx.db.query.files(
      {
        where: {
          id
        }
      },
      "{ id, url, filename }"
    );
    removeFile(fileEntry[0].url, ctx, info);
    return await ctx.db.mutation.deleteFile({ where: { id } }, info);
  }
};

module.exports = Mutations;
