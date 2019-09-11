import gql from 'graphql-tag';

const CREATE_COMPANY_MUTATION = gql`
  mutation CREATE_COMPANY_MUTATION(
    $name: String!
    $logo: String
    $notes: String
    $phone: String
    $mobile: String
    $fax: String
    $email: String
    $street: String
    $houseNo: String
    $website: String
    $zip: String
  ) {
    createCompany(
      name: $name
      logo: $logo
      notes: $notes
      phone: $phone
      mobile: $mobile
      fax: $fax
      email: $email
      street: $street
      houseNo: $houseNo
      website: $website
      zip: $zip
    ) {
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

const DELETE_COMPANY_MUTATION = gql`
  mutation DELETE_COMPANY_MUTATION($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

const NEW_CUSTOMER_MUTATION = gql`
  mutation NEW_CUSTOMER_MUTATION(
    $firstName: String!
    $lastName: String!
    $customerNo: String
    $refName: String
    $idCardType: IDCardType
    $idCardNo: String
    $idCardIssueDep: String
    $idCardValidFrom: DateTime
    $idCardValidTo: DateTime
    $socialSecurityNumber: String
    $taxId: String
    $notes: String
    $firstCallDate: DateTime
    $employer: String
    $weCode: String
    $phone: String
    $mobile: String
    $fax: String
    $email: String
    $street: String
    $houseNo: String
    $title: Title
    $gender: Gender
    $birthday: DateTime
    $birthCity: String
    $nationality: String
    $jobTitle: String
    $martialStatus: MaterialStatus
    $workingStatus: String
    $active: Boolean
    $representative: ID!
    $zip: String
  ) {
    createCustomer(
      firstName: $firstName
      lastName: $lastName
      customerNo: $customerNo
      refName: $refName
      idCardType: $idCardType
      idCardNo: $idCardNo
      idCardIssueDep: $idCardIssueDep
      idCardValidFrom: $idCardValidFrom
      idCardValidTo: $idCardValidTo
      socialSecurityNumber: $socialSecurityNumber
      taxId: $taxId
      notes: $notes
      firstCallDate: $firstCallDate
      employer: $employer
      weCode: $weCode
      phone: $phone
      mobile: $mobile
      fax: $fax
      email: $email
      street: $street
      houseNo: $houseNo
      title: $title
      gender: $gender
      birthday: $birthday
      birthCity: $birthCity
      nationality: $nationality
      jobTitle: $jobTitle
      martialStatus: $martialStatus
      workingStatus: $workingStatus
      active: $active
      representative: $representative
      zip: $zip
    ) {
      id
      representative {
        id
      }
      firstName
      lastName
      active
    }
  }
`;

const CREATE_MAILTEMPLATE_MUTATION = gql`
  mutation CREATE_MAILTEMPLATE_MUTATION(
    $subject: String!
    $body: String!
    $eventType: String!
  ) {
    createMailTemplate(subject: $subject, body: $body, eventType: $eventType) {
      id
      subject
      body
      eventType
    }
  }
`;

const UPDATE_MAILTEMPLATE_MUTATION = gql`
  mutation UPDATE_MAILTEMPLATE_MUTATION(
    $id: ID!
    $subject: String!
    $body: String!
    $eventType: String!
  ) {
    updateMailTemplate(
      id: $id
      subject: $subject
      body: $body
      eventType: $eventType
    ) {
      id
      subject
      body
      eventType
    }
  }
`;

const DELETE_BULLETPOINT_MUTATION = gql`
  mutation DELETE_BULLETPOINT_MUTATION($id: ID!) {
    deleteBulletpoint(id: $id) {
      id
      title
      category
    }
  }
`;

const CLOSE_BULLETPOINT_MUTATION = gql`
  mutation CLOSE_BULLETPOINT_MUTATION($id: ID!) {
    closeBulletpoint(id: $id) {
      id
      title
      closedDate
    }
  }
`;

const UPDATE_BULLETPOINT_MUTATION = gql`
  mutation UPDATE_BULLETPOINT_MUTATION($id: ID!, $category: Int!) {
    updateBulletpoint(id: $id, category: $category) {
      id
      title
      category
    }
  }
`;

const CREATE_SETTINGS_MUTATION = gql`
  mutation CREATE_SETTINGS_MUTATION {
    createSettings {
      boardPrioCaptions
      themeColorPrimary
      themeColorSecondary
    }
  }
`;

const UPDATE_SETTINGS_MUTATION = gql`
  mutation UPDATE_SETTINGS_MUTATION(
    $id: ID!
    $boardPrioCaptions: [String!]
    $themeColorPrimary: String
    $themeColorSecondary: String
  ) {
    updateSettings(
      id: $id
      boardPrioCaptions: $boardPrioCaptions
      themeColorPrimary: $themeColorPrimary
      themeColorSecondary: $themeColorSecondary
    ) {
      boardPrioCaptions
      themeColorPrimary
      themeColorSecondary
    }
  }
`;

const SEND_FOLLOW_UP_MUTATION = gql`
  mutation SEND_FOLLOW_UP_MUTATION(
    $receiverMail: String!
    $subject: String!
    $body: String!
    $bodyAsText: String!
    $attachments: [String]
  ) {
    sendEventFollowUp(
      receiverMail: $receiverMail
      subject: $subject
      body: $body
      bodyAsText: $bodyAsText
      attachments: $attachments
    ) {
      message
      code
    }
  }
`;

const FILE_DELETE_MUTATION = gql`
  mutation FILE_DELETE_MUTATION($id: ID!) {
    deleteFile(id: $id) {
      id
    }
  }
`;

const MAIL_TEMPLATE_DELETE_MUTATION = gql`
  mutation MAIL_TEMPLATE_DELETE_MUTATION($id: ID!) {
    deleteMailTemplate(id: $id) {
      id
    }
  }
`;

const SEND_INVITE_MUTATION = gql`
  mutation SEND_INVITE_MUTATION(
    $receiverMail: String!
    $subject: String!
    $body: String!
    $bodyAsText: String!
    $attendeeId: ID!
  ) {
    sendEventInvite(
      receiverMail: $receiverMail
      subject: $subject
      body: $body
      bodyAsText: $bodyAsText
      attendeeId: $attendeeId
    ) {
      message
    }
  }
`;

const CREATE_BULLETPOINT_MUTATION = gql`
  mutation CREATE_BULLETPOINT_MUTATION(
    $title: String!
    $category: Int!
    $dueDate: DateTime
    $closedDate: DateTime
    $notes: String
  ) {
    createBulletpoint(
      title: $title
      category: $category
      dueDate: $dueDate
      closedDate: $closedDate
      notes: $notes
    ) {
      title
      category
      dueDate
      closedDate
      notes
    }
  }
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      firstName
      lastName
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $workerNo: String!
  ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      workerNo: $workerNo
    ) {
      id
      email
      firstName
      lastName
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      firstName
      lastName
      email
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const UPLOAD_FILES_MUTATION = gql`
  mutation UPLOAD_FILES_MUTATION($files: [Upload!]!) {
    uploadFiles(files: $files) {
      id
    }
  }
`;

export {
  CREATE_COMPANY_MUTATION,
  CLOSE_BULLETPOINT_MUTATION,
  CREATE_BULLETPOINT_MUTATION,
  CREATE_MAILTEMPLATE_MUTATION,
  CREATE_SETTINGS_MUTATION,
  DELETE_BULLETPOINT_MUTATION,
  DELETE_COMPANY_MUTATION,
  DELETE_CUSTOMER_MUTATION,
  FILE_DELETE_MUTATION,
  MAIL_TEMPLATE_DELETE_MUTATION,
  NEW_CUSTOMER_MUTATION,
  SEND_FOLLOW_UP_MUTATION,
  SEND_INVITE_MUTATION,
  UPDATE_BULLETPOINT_MUTATION,
  UPDATE_MAILTEMPLATE_MUTATION,
  UPDATE_SETTINGS_MUTATION,
  REQUEST_RESET_MUTATION,
  RESET_MUTATION,
  SIGNIN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_PERMISSIONS_MUTATION,
  UPDATE_USER_MUTATION,
  UPLOAD_FILES_MUTATION,
};
