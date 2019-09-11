import gql from 'graphql-tag';

const MY_CUSTOMERS_QUERY = gql`
  query MY_CUSTOMERS_QUERY($representative: ID!) {
    myCustomers(representative: $representative) {
      id
      firstName
      lastName
      customerNo
      refName
      notes
      weCode
      title
      gender
      birthday
      active
    }
  }
`;

const COMPANIES_PAGED_QUERY = gql`
  query COMPANIES_PAGED_QUERY($skip: Int, $first: Int) {
    companiesPaged(skip: $skip, first: $first) {
      id
      name
      logo
      notes
      phone
      mobile
      fax
      email
      street
      houseNo
      website
      zip {
        id
        code
      }
    }
  }
`;

const COMPANIES_CONNECTION_QUERY = gql`
  query COMPANIES_CONNECTION_QUERY {
    companiesConnection {
      aggregate {
        count
      }
    }
  }
`;

const ALL_WORKER_QUERY = gql`
  query ALL_WORKER_QUERY {
    workers(orderBy: statOrderNo_ASC) {
      id
      firstName
      lastName
      email
      workerNo
      statOrderNo
      profileImage
      lastLogin
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = 100) {
    users(first: $first, skip: $skip, orderBy: statOrderNo_ASC) {
      id
      firstName
      lastName
      email
      permissions
      workerNo
      # image
      # largeImage
    }
  }
`;

const HISTORY_BULLETPOINTS_QUERY = gql`
  query HISTORY_BULLETPOINTS_QUERY {
    myBulletpointsHistory {
      id
      title
      category
      dueDate
      closedDate
      notes
    }
  }
`;

const MY_BULLETPOINTS_QUERY = gql`
  query MY_BULLETPOINTS_QUERY {
    myBulletpoints(orderBy: createdAt_DESC) {
      id
      title
      category
      dueDate
      closedDate
      notes
    }
  }
`;

const COMPANY_QUERY = gql`
  query COMPANY_QUERY($id: ID!) {
    company(id: $id) {
      id
      name
      logo
      notes
      phone
      mobile
      fax
      email
      street
      houseNo
      website
      zip {
        id
        code
      }
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      firstName
      lastName
      permissions
    }
  }
`;

const USER_SETTINGS_QUERY = gql`
  query USER_SETTINGS_QUERY {
    userSettings {
      id
      boardPrioCaptions
      themeColorPrimary
      themeColorSecondary
    }
  }
`;

const MAIL_TEMPLATES_QUERY = gql`
  query MAIL_TEMPLATES_QUERY {
    mailTemplates {
      id
      subject
      body
      eventType
    }
  }
`;

const FILES_QUERY = gql`
  query FILES_QUERY {
    files {
      id
      createdAt
      updatedAt
      filename
      mimetype
      encoding
      url
    }
  }
`;

const ALL_SENT_MAILS_QUERY = gql`
  query ALL_SENT_MAILS_QUERY($skip: Int, $first: Int) {
    allSentMailsPaged(skip: $skip, first: $first) {
      id
      msgId
      msgType
      receiverMail
      senderMail
      subject
      timestamp
      context
    }
  }
`;

const ALL_SENT_MAILS_CONNECTION_QUERY = gql`
  query ALL_SENT_MAILS_CONNECTION_QUERY {
    allSentMailsConnection {
      aggregate {
        count
      }
    }
  }
`;

const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      workerNo
      lastLogin
    }
  }
`;

const USER_PAGINATION_QUERY = gql`
  query USER_PAGINATION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

export {
  ALL_SENT_MAILS_CONNECTION_QUERY,
  ALL_SENT_MAILS_QUERY,
  ALL_USERS_QUERY,
  ALL_WORKER_QUERY,
  COMPANIES_CONNECTION_QUERY,
  COMPANIES_PAGED_QUERY,
  COMPANY_QUERY,
  CURRENT_USER_QUERY,
  FILES_QUERY,
  HISTORY_BULLETPOINTS_QUERY,
  MAIL_TEMPLATES_QUERY,
  MY_BULLETPOINTS_QUERY,
  MY_CUSTOMERS_QUERY,
  SINGLE_USER_QUERY,
  USER_QUERY,
  USER_PAGINATION_QUERY,
  USER_SETTINGS_QUERY,
};
