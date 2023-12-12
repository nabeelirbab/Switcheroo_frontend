import gql from 'graphql-tag';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const clearApolloCache = client => {
  console.log('clear casheeeeee');

  client.clearStore();
};
// For splash screennnnn
export const Getalloffers = gql`
  query {
    allOffers {
      id
      cash
      messages {
        messageText
      }
    }
  }
`;

export function useGetAlloffers(baseOptions) {
  return ApolloReactHooks.useQuery(Getalloffers, baseOptions);
}
// splash enddd*****************************
export const ClearCashee = () => {
  return ApolloReactHooks.useApolloClient().clearStore();
};
// For splash screennnnn
export const GetMyNameDocument = gql`
  query GetMyName {
    me {
      firstName
      avatarUrl
      blurb
      createdAt
      dateOfBirth
      distance
      email
      firstName
      gender
      id
      isChatNotificationsEnabled
      isMatchNotification
      lastName
      mobile
      username
      latitude
      longitude
    }
  }
`;

export function useGetMyNameQuery(baseOptions) {
  return ApolloReactHooks.useQuery(GetMyNameDocument, baseOptions);
}
// splash enddd*****************************

// For login screennnnnn*********************

export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
      username
    }
  }
`;

export function useSignInMutation(baseOptions) {
  return ApolloReactHooks.useMutation(SignInDocument, baseOptions);
}

// Login enddd*****************************

// For delete user *********************
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: Uuid!) {
    deleteUser(userId: $userId)
  }
`;

export function useDeleteUserMutation(baseOptions) {
  return ApolloReactHooks.useMutation(DeleteUserDocument, baseOptions);
}
// delete acount enddd*****************************

// For Signup screennnnnn*********************

export const SignupDocument = gql`
  mutation RegisterUser($user: RegisterUserInput!, $password: String!) {
    registerUser(user: $user, password: $password)
  }
`;

export function useSignupMutation(baseOptions) {
  return ApolloReactHooks.useMutation(SignupDocument, baseOptions);
}

// Signup enddd*****************************
// For Otpscreen *********************

export const VerifyUserDocument = gql`
  mutation VerifyUser($email: String!, $verificationCode: String!) {
    verifyUser(email: $email, verificationCode: $verificationCode)
  }
`;

export function VerifayOtpMutation(baseOptions) {
  return ApolloReactHooks.useMutation(VerifyUserDocument, baseOptions);
}

// Otpscreenn enddd*****************************

// For Otpscreen *********************

export const Resendotpquery = gql`
  mutation resendPassword($email: String!, $userId: Uuid!) {
    resendPassword(email: $email, userId: $userId)
  }
`;
export function Resendotp(baseOptions) {
  return ApolloReactHooks.useMutation(Resendotpquery, baseOptions);
}

// Otpscreenn enddd*****************************

// For firsttime add profile  *********************

export const UpdateUserProfileDocument = gql`
  mutation UpdateUserProfile($blurb: String, $avatarUrl: String) {
    updateUserProfile(blurb: $blurb, avatarUrl: $avatarUrl) {
      id
      blurb
      avatarUrl
    }
  }
`;

export function UpdateUserProfileMutation(baseOptions) {
  return ApolloReactHooks.useMutation(UpdateUserProfileDocument, baseOptions);
}

// profile  enddd*****************************

// forgot password mutation

export const ResetPasswordInitiateDocument = gql`
  mutation ResetPasswordInitiate($email: String!) {
    resetPasswordInitiate(email: $email)
  }
`;

export function ForgotPasswordMutation(baseOptions) {
  return ApolloReactHooks.useMutation(
    ResetPasswordInitiateDocument,
    baseOptions,
  );
}

// enndddd

// forgot  password otp verification mutation

export const RetrieveResetPasswordTokenDocument = gql`
  mutation RetrieveResetPasswordToken(
    $email: String!
    $verificationCode: String!
  ) {
    retrieveResetPasswordToken(
      email: $email
      verificationCode: $verificationCode
    )
  }
`;
export function ForgotOtpverification(baseOptions) {
  return ApolloReactHooks.useMutation(
    RetrieveResetPasswordTokenDocument,
    baseOptions,
  );
}

// enndddd

// reset new password mutation

export const ResetPasswordDocument = gql`
  mutation ResetPassword(
    $email: String!
    $newPassword: String!
    $resetPasswordToken: String!
  ) {
    resetPassword(
      email: $email
      newPassword: $newPassword
      resetPasswordToken: $resetPasswordToken
    )
  }
`;
export function useResetPasswordMutation(baseOptions) {
  return ApolloReactHooks.useMutation(ResetPasswordDocument, baseOptions);
}

// enndddd
// Logout user mutation
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export function Logoutacountmutaion(baseOptions) {
  return ApolloReactHooks.useMutation(SignOutDocument, baseOptions);
}

// enndddd  logout
// add new item mutation
export const CreateItemDocument = gql`
  mutation CreateItem($item: ItemInput!) {
    createItem(item: $item) {

        askingPrice
        categories
        createdByUserId
        description
        id
        imageUrls
        isFlexible
        isHidden
        isSwapOnly
        latitude
        longitude
        mainImageUrl
        title
        updatedByUserId
     
    }
  }
`;
export function AddnewitemMutation(baseOptions) {
  return ApolloReactHooks.useMutation(CreateItemDocument, baseOptions);
}

// end new item adddd

// update item  mutation
export const UpdateItemDocument = gql`
  mutation UpdateItem($id: Uuid!, $item: ItemInput!) {
    updateItem(id: $id, item: $item) {
      askingPrice
      categories
      createdByUserId
      description
      flexibilityRange
      id
      imageUrls
      isFlexible
      isHidden
      isSwapOnly
      latitude
      longitude
      mainImageUrl
      title
      updatedByUserId
    }
  }
`;

export function UpdateItemMutation(baseOptions) {
  return ApolloReactHooks.useMutation(UpdateItemDocument, baseOptions);
}

// end update item adddd

// get my list of items and my detail end
export const myitemList = gql`
  query Me {
    me {
      avatarUrl
      distance
      email
      firstName
      id
      username
      items {
        askingPrice
        categories
        createdByUserId
        description
        flexibilityRange
        id
        imageUrls
        isFlexible
        isHidden
        isSwapOnly
        latitude
        longitude
        mainImageUrl
        title
      }
      lastName
    }
  }
`;
export function Getmyitemquery(baseOptions) {
  return ApolloReactHooks.useQuery(myitemList, baseOptions);
}
export function GetAllMyitem() {
  const [getMyitem, { loading, data, error }] =
    ApolloReactHooks.useLazyQuery(myitemList); // Use useLazyQuery

  return { getMyitem, loading, data, error }; // Return the function and data
}
// get my list of items and my detail end

// get match item list
export const getMatchItemDetail = gql`
  query GetMyItemFeed(
    $amount: Decimal
    $itemId: Uuid!
    $categories: [String!]
    $limit: Int!
    $cursor: String
    $distance: Decimal
    $latitude: Decimal
    $longitude: Decimal
    $inMiles: Boolean
  ) {
    items(
      amount: $amount
      itemId: $itemId
      categories: $categories
      cursor: $cursor
      limit: $limit
      distance: $distance
      latitude: $latitude
      longitude: $longitude
      inMiles: $inMiles
    ) {
      cursor
      data {
        id
        mainImageUrl
        description
        title
        askingPrice
        longitude
        latitude
        isSwapOnly
      }
      hasNextPage
      totalCount
    }
  }
`;

export function GetAllMatchItem2() {
  const [getMatchItem, { loading, data, error }] =
    ApolloReactHooks.useLazyQuery(getMatchItemDetail); // Use useLazyQuery

  return { getMatchItem, loading, data, error }; // Return the function and data
}

// get match ennnnnndddddddd

// get list of itemofer
export const getallofferbuitem = gql`
  query AllOffersByItemId($itemId: Uuid!) {
    allOffersByItemId(itemId: $itemId) {
      cash
      createdAt
      id
      sourceItemId
      sourceStatus
      targeteStatus
      targetItemId
    }
  }
`;

export function Getofferbyid() {
  const [
    getOfferagainstid,
    { loading: getoferloading, data: getoferdata, error: getofererror },
  ] = ApolloReactHooks.useLazyQuery(getallofferbuitem); // Use useLazyQuery

  return { getOfferagainstid, getoferloading, getoferdata, getofererror }; // Return the function and data
}

// get match ennnnnndddddddd
// get getReciveOffers item list
export const ReciveOffer = gql`
  query {
    receivedOffers {
      id
      cash

sourceStatus,
targeteStatus
      messages {
        messageText
      }
      sourceItem {
        id
        imageUrls
        title
        description
        askingPrice
        mainImageUrl
          latitude
        longitude
      }
      targetItem {
        id
        imageUrls
        title
        description
        askingPrice
        mainImageUrl
          latitude
        longitude
      }
    }
  }
`;

export function GetReciveOffer() {
  const [
    getReciveOffers,
    { loading: reciveLoading, data: reciveData, error: reciveerror },
  ] = ApolloReactHooks.useLazyQuery(ReciveOffer); // Use useLazyQuery

  return { getReciveOffers, reciveLoading, reciveData, reciveerror }; // Return the function and data
}

// get getReciveOffers ennnnnndddddddd

// get getReciveOffers item list
export const GetMadeoffer = gql`
  query {
    createdOffers {
      id
      cash
      messages {
        messageText
      }
      sourceItem {
        id
        imageUrls
        title
        description
        askingPrice
        mainImageUrl
        latitude
        longitude
      }
      targetItem {
        id
        imageUrls
        title
        description
        askingPrice
        mainImageUrl
          latitude
        longitude
      }
    }
  }
`;

export function GetmadeOffer() {
  const [
    getmadeOffer,
    { loading: madeLoading, data: madedata, error: madeerror },
  ] = ApolloReactHooks.useLazyQuery(GetMadeoffer); // Use useLazyQuery

  return { getmadeOffer, madeLoading, madedata, madeerror }; // Return the function and data
}

// get getReciveOffers ennnnnndddddddd

// Remove Item
export const ArchiveItemDocument = gql`
  mutation ($itemId: Uuid!) {
    deleteItem(itemId: $itemId)
  }
`;

export function RemoviitemMutation(baseOptions) {
  return ApolloReactHooks.useMutation(ArchiveItemDocument, baseOptions);
}

// Remove Item ennnnnndddddddd
// Upload fcm token
export const UpdateuserFcm = gql`
  mutation UpdateUserFCMToken($fcmtoken: String!) {
    updateUserFCMToken(fcmtoken: $fcmtoken) {
      id
    }
  }
`;

export function UpdateUserFcm(baseOptions) {
  return ApolloReactHooks.useMutation(UpdateuserFcm, baseOptions);
}

// Remove Item ennnnnndddddddd

// Update user distance

const DistanceQuery = gql`
  mutation UpdateUserDistance($distance: Int) {
    updateUserDistance(distance: $distance) {
      distance
    }
  }
`;

export function UpdateDistance(baseOptions) {
  return ApolloReactHooks.useMutation(DistanceQuery, baseOptions);
}
// end update distanceee..///////

// Update user dateofbirth

const Genderquery = gql`
  mutation UpdateUserGender($gender: String) {
    updateUserGender(gender: $gender) {
      gender
    }
  }
`;

export function UpdateGender(baseOptions) {
  return ApolloReactHooks.useMutation(Genderquery, baseOptions);
}
// end update date of birth..///////

// DeleteMadeoffer

const delteMade = gql`
  mutation deleteOffer($id: Uuid!) {
    deleteOffer(id: $id)
  }
`;

export function DeleteMadeoffer(baseOptions) {
  return ApolloReactHooks.useMutation(delteMade, baseOptions);
}
// end DeleteMadeoffer




// Accept Mutation

const AcceptMutation = gql`
  mutation acceptOffer($offerId: Uuid!) {
    acceptOffer(offerId: $offerId)
  }
`;



export function AccetReciveOffer(baseOptions) {
  return ApolloReactHooks.useMutation(AcceptMutation, baseOptions);
}
// end Accept Mutation
// Update user mobilenumber

const mobileUpdatequery = gql`
  mutation UpdateUserMobile($mobile: String) {
    updateUserMobile(mobile: $mobile) {
      mobile
    }
  }
`;

export function UpdateMobilenumber(baseOptions) {
  return ApolloReactHooks.useMutation(mobileUpdatequery, baseOptions);
}
// end update mobile nom..///////

const dobUpdatequery = gql`
  mutation UpdateUserDateOfBirth($dateOfBirth: String) {
    updateUserDateOfBirth(dateOfBirth: $dateOfBirth) {
      dateOfBirth
    }
  }
`;

export function UpdateDOB(baseOptions) {
  return ApolloReactHooks.useMutation(dobUpdatequery, baseOptions);
}
// end update mobile nom..///////
// end Locationupdate nom..///////

const Locationupdate = gql`
  mutation UpdateUserLocation($latitude: Decimal, $longitude: Decimal) {
    updateUserLocation(latitude: $latitude, longitude: $longitude) {
      id
      isChatNotificationsEnabled
      isMatchNotification
      lastName
      latitude
      longitude
    }
  }
`;

export function UpdateUserLocat(baseOptions) {
  return ApolloReactHooks.useMutation(Locationupdate, baseOptions);
}
// end Locationupdate  nom..///////

// Update user item location

export const UpdateItemLocationDocument = gql`
  mutation UpdateItemLocation(
    $itemIds: [Uuid!]!
    $latitude: Decimal
    $longitude: Decimal
    $userId: Uuid!
  ) {
    updateItemLocation(
      itemIds: $itemIds
      latitude: $latitude
      longitude: $longitude
      userId: $userId
    )
  }
`;
export function UpdateItemLocationMutation(baseOptions) {
  return ApolloReactHooks.useMutation(UpdateItemLocationDocument, baseOptions);
}
// end item location update.///////
// create offer
export const CreateOfferDocument = gql`
  mutation CreateOffer(
    $sourceItemId: Uuid!
    $targetItemId: Uuid!
    $sourceStatus: Int!
    $targeteStatus: Int!
  ) {
    createOffer(
      sourceItemId: $sourceItemId
      targetItemId: $targetItemId
      sourceStatus: $sourceStatus
      targeteStatus: $targeteStatus
    ) {
      id
      sourceItemId
      targetItemId
      createdAt
      cash
      sourceStatus
      targeteStatus
    }
  }
`;
export function useCreateOfferMutation(baseOptions) {
  return ApolloReactHooks.useMutation(CreateOfferDocument, baseOptions);
}
//end create offer
// create cash offer
export const CreateCashOfferDocument = gql`
  mutation CreateOffer(
    $sourceItemId: Uuid!
    $targetItemId: Uuid!
    $cash: Int!
    $sourceStatus: Int!
    $targeteStatus: Int!
  ) {
    createOffer(
      sourceItemId: $sourceItemId
      targetItemId: $targetItemId
      cash: $cash
      sourceStatus: $sourceStatus
      targeteStatus: $targeteStatus
    ) {
      id
      sourceStatus
      targeteStatus
    }
  }
`;

export function useCreateCashOfferMutation(baseOptions) {
  return ApolloReactHooks.useMutation(CreateCashOfferDocument, baseOptions);
}
//end create cash offer
// Dismiss offer
export const DismissItemDocument = gql`
  mutation DismissItem($sourceItemId: Uuid, $targetItemId: Uuid!) {
    dismissItem(sourceItemId: $sourceItemId, targetItemId: $targetItemId)
  }
`;
export function useDismissItemMutation(baseOptions) {
  return ApolloReactHooks.useMutation(DismissItemDocument, baseOptions);
}
//end create offer
