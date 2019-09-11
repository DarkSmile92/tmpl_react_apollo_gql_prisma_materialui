const { forwardTo } = require("prisma-binding");
const { hasPermission, isAuthenticated } = require("../utils");
const { ActivityRecordTypes } = require("../modules/dbEnums");

const Query = {
  users: forwardTo("db"),
  user(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.user(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  usersConnection: forwardTo("db"),
  bulletpoints: forwardTo("db"),
  bulletpoint: forwardTo("db"),
  bulletpointsConnection: forwardTo("db"),
  allSettings(parent, args, ctx, info) {
    return ctx.db.query.settingses({}, info);
  },
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
  },
  async userSettings(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    const settings = await ctx.db.query.settingses(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
    return settings[0];
  },
  workers(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.users(
      {
        where: {
          NOT: {
            workerNo: "DISABLED"
          }
        },
        orderBy: args.orderBy
      },
      info
    );
  },
  myBulletpoints(parent, args, ctx, info) {
    // check if there is a current user ID
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.bulletpoints(
      {
        where: {
          AND: [
            {
              user: {
                id: userId
              }
            },
            {
              closedDate: null
            }
          ]
        }
      },
      info
    );
  },
  myBulletpointsHistory(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.bulletpoints(
      {
        where: {
          AND: [
            {
              user: {
                id: userId
              }
            },
            {
              NOT: [
                {
                  closedDate: null
                }
              ]
            }
          ]
        }
      },
      info
    );
  },
  mailTemplates(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.mailTemplates(
      {
        where: { ...args }
      },
      info
    );
  },
  allSentMails(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.sentMails(
      {
        orderBy: "timestamp_DESC"
      },
      info
    );
  },
  allSentMailsPaged(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.sentMails(
      {
        orderBy: "timestamp_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  allSentMailsConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.sentMailsConnection({}, info);
  },
  getTemplate(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.getTemplate(
      {
        where: { ...args }
      },
      info
    );
  },
  allZipCodes(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.zipCodes({}, info);
  },
  channel(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channel(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  channels(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channels(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  channelsConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channelsConnection({}, info);
  },
  channelsPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channels(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  holiday(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.holidays(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  holidays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.holidayses(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  holidaysConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.holidaysesConnection({}, info);
  },
  holidaysPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.holidayses(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  nameDay(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.nameDays(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  nameDays(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.nameDayses(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  nameDaysConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.nameDaysesConnection({}, info);
  },
  nameDaysPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.nameDayses(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  content(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.content(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  contents(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.contents(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  contentsConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.contentsConnection({}, info);
  },
  contentsPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.contents(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  channelContent(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channelContent(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  channelContents(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channelContents(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  channelContentsConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channelContentsConnection({}, info);
  },
  channelContentsPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.channelContents(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  company(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.company(
      {
        where: {
          id: args.id
        }
      },
      info
    );
  },
  companies(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.companies(
      {
        where: {
          ...args
        }
      },
      info
    );
  },
  companiesConnection(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.companiesConnection({}, info);
  },
  companiesPaged(parent, args, ctx, info) {
    isAuthenticated(ctx.request);
    return ctx.db.query.companies(
      {
        where: {
          ...args
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  myCustomers(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.customers(
      {
        where: {
          representative: {
            id: args.representative
          }
        }
      },
      info
    );
  },
  myCustomersConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.customersConnection(
      {
        where: {
          representative: {
            id: args.representative
          },
          active: args.active
        }
      },
      info
    );
  },
  myInactiveCustomersConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.customersConnection(
      {
        where: {
          representative: {
            id: args.representative
          },
          active: false
        }
      },
      info
    );
  },
  myCustomersPaged(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.customers(
      {
        where: {
          representative: {
            id: args.representative
          },
          active: true
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  myInactiveCustomersPaged(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    return ctx.db.query.customers(
      {
        where: {
          representative: {
            id: args.representative
          },
          active: false
        },
        orderBy: "createdAt_DESC",
        skip: args.skip,
        first: args.first
      },
      info
    );
  },
  file(parent, { id }, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    return ctx.db.query.file({ where: { id } }, info);
  },
  files(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(`You must be logged in to do that!`);
    }
    return ctx.db.query.files(args, info);
  }
  // async users(parent, args, ctx, info) {   // 1. Check if they are logged in if
  // (!ctx.request.userId) {     throw new Error('You must be logged in!');   }
  // console.log(ctx.request.userId);   // 2. Check if the user has the
  // permissions to query all the users   hasPermission(ctx.request.user,
  // ['ADMIN', 'PERMISSIONUPDATE']);   // 2. if they do, query all the users!
  // return ctx     .db     .query     .users({}, info); }
};

module.exports = Query;
