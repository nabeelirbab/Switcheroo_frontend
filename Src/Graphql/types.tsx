import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Uuid: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type Item = {
  __typename?: 'Item';
  askingPrice: Scalars['Decimal'];
  categories: Array<Scalars['String']>;
  createdByUser: User;
  createdByUserId: Scalars['Uuid'];
  description: Scalars['String'];
  flexibilityRange?: Maybe<Scalars['Int']>;
  id: Scalars['Uuid'];
  imageUrls: Array<Scalars['String']>;
  isFlexible: Scalars['Boolean'];
  isHidden: Scalars['Boolean'];
  isSwapOnly: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  mainImageUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedByUser: User;
  updatedByUserId: Scalars['Uuid'];
};

export type ItemInput = {
  askingPrice: Scalars['Decimal'];
  categories: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  imageUrls: Array<Maybe<Scalars['String']>>;
  isSwapOnly: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  title: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  createdByUser: User;
  createdByUserId: Scalars['Uuid'];
  id?: Maybe<Scalars['Uuid']>;
  isActive?: Maybe<Scalars['Boolean']>;
  itemsId?: Maybe<Scalars['Uuid']>;
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  updatedByUser: User;
  updatedByUserId: Scalars['Uuid'];
};

export type LocationInput = {
  isActive: Scalars['Boolean'];
  itemId: Scalars['Uuid'];
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
};

export type Message = {
  __typename?: 'Message';
  createdByUserId: Scalars['Uuid'];
  id: Scalars['Uuid'];
  messageReadAt?: Maybe<Scalars['DateTime']>;
  messageText: Scalars['String'];
  offerId: Scalars['Uuid'];
};

export type MessageInput = {
  messageText: Scalars['String'];
  offerId: Scalars['Uuid'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLocation: Location;
  archiveItem: Scalars['Boolean'];
  createItem: Item;
  createMessage: Message;
  createOffer: Offer;
  deleteLocation: Location;
  dismissItem: Scalars['Boolean'];
  markMessagesAsRead: Offer;
  registerUser: Scalars['Uuid'];
  resetPassword: Scalars['Boolean'];
  resetPasswordInitiate: Scalars['Boolean'];
  retrieveResetPasswordToken?: Maybe<Scalars['String']>;
  signIn: User;
  signOut: Scalars['Boolean'];
  updateItem: Item;
  updateItemLocation: Scalars['String'];
  updateUserDateOfBirth: User;
  updateUserDistance: User;
  updateUserEmail: User;
  updateUserGender: User;
  updateUserMobile: User;
  updateUserName: User;
  updateUserProfile: User;
  verifyUser: Scalars['Boolean'];
};

export type MutationAddLocationArgs = {
  locationInput: LocationInput;
};

export type MutationArchiveItemArgs = {
  itemId: Scalars['Uuid'];
};

export type MutationCreateItemArgs = {
  item: ItemInput;
};

export type MutationCreateMessageArgs = {
  message: MessageInput;
};

export type MutationCreateOfferArgs = {
  sourceItemId: Scalars['Uuid'];
  sourceStatus: Scalars['Int'];
  targeteStatus?: Maybe<Scalars['Int']>;
  targetItemId: Scalars['Uuid'];
};

export type MutationDeleteLocationArgs = {
  id: Scalars['Uuid'];
};

export type MutationDismissItemArgs = {
  sourceItemId?: Maybe<Scalars['Uuid']>;
  targetItemId: Scalars['Uuid'];
};

export type MutationMarkMessagesAsReadArgs = {
  offerId: Scalars['String'];
};

export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  user: RegisterUserInput;
};

export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};

export type MutationResetPasswordInitiateArgs = {
  email: Scalars['String'];
};

export type MutationRetrieveResetPasswordTokenArgs = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpdateItemArgs = {
  id: Scalars['Uuid'];
  item: ItemInput;
};

export type MutationUpdateItemLocationArgs = {
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  userId: Scalars['Uuid'];
};

export type MutationUpdateUserDateOfBirthArgs = {
  dateOfBirth?: Maybe<Scalars['String']>;
};

export type MutationUpdateUserDistanceArgs = {
  distance?: Maybe<Scalars['Int']>;
};

export type MutationUpdateUserEmailArgs = {
  email: Scalars['String'];
};

export type MutationUpdateUserGenderArgs = {
  gender?: Maybe<Scalars['String']>;
};

export type MutationUpdateUserMobileArgs = {
  mobile?: Maybe<Scalars['String']>;
};

export type MutationUpdateUserNameArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type MutationUpdateUserProfileArgs = {
  avatarUrl?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
};

export type MutationVerifyUserArgs = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type Offer = {
  __typename?: 'Offer';
  cash?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Uuid'];
  messages: Array<Message>;
  sourceItem: Item;
  sourceItemId: Scalars['Uuid'];
  sourceStatus: Scalars['Int'];
  targeteStatus?: Maybe<Scalars['Int']>;
  targetItem: Item;
  targetItemId: Scalars['Uuid'];
};

export type PaginatedOfItem = {
  __typename?: 'PaginatedOfItem';
  cursor: Scalars['String'];
  data: Array<Item>;
  hasNextPage: Scalars['Boolean'];
  totalCount: Scalars['Int'];
};

export type PaginatedOfLocation = {
  __typename?: 'PaginatedOfLocation';
  cursor: Scalars['String'];
  data: Array<Location>;
  hasNextPage: Scalars['Boolean'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Scalars['String']>;
  item: Item;
  items: PaginatedOfItem;
  location: PaginatedOfLocation;
  me: User;
  offer: Offer;
};

export type QueryItemArgs = {
  itemId: Scalars['Uuid'];
};

export type QueryItemsArgs = {
  amount?: Maybe<Scalars['Decimal']>;
  categories?: Maybe<Array<Scalars['String']>>;
  cursor?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Decimal']>;
  inMiles?: Maybe<Scalars['Boolean']>;
  latitude?: Maybe<Scalars['Decimal']>;
  limit: Scalars['Int'];
  longitude?: Maybe<Scalars['Decimal']>;
};

export type QueryLocationArgs = {
  isActive?: Maybe<Scalars['Boolean']>;
  itemId: Scalars['Uuid'];
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
};

export type QueryOfferArgs = {
  offerId: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  distance?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Uuid'];
  isChatNotificationsEnabled: Scalars['Boolean'];
  isMatchNotification: Scalars['Boolean'];
  items: Array<Item>;
  lastName: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  offers: Array<Offer>;
  username: Scalars['String'];
};

export type SignOutMutationVariables = {};

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'signOut'>;

export type ArchiveItemMutationVariables = {
  itemId: Scalars['Uuid'];
};

export type ArchiveItemMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'archiveItem'>;

export type GetMyProfileQueryVariables = {};

export type GetMyProfileQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    User,
    'id' | 'avatarUrl' | 'blurb' | 'firstName' | 'lastName' | 'email' | 'mobile' | 'gender' | 'dateOfBirth' | 'distance'
  > & { items: Array<{ __typename?: 'Item' } & Pick<Item, 'id' | 'mainImageUrl'>> };
};

export type GetMyAvatarAndBlurbQueryVariables = {};

export type GetMyAvatarAndBlurbQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id' | 'avatarUrl' | 'blurb'>;
};

export type UpdateUserProfileMutationVariables = {
  blurb?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
};

export type UpdateUserProfileMutation = { __typename?: 'Mutation' } & {
  updateUserProfile: { __typename?: 'User' } & Pick<User, 'id' | 'blurb' | 'avatarUrl'>;
};

export type UpdateUserDateOfBirthMutationVariables = {
  dateOfBirth?: Maybe<Scalars['String']>;
};

export type UpdateUserDateOfBirthMutation = { __typename?: 'Mutation' } & {
  updateUserDateOfBirth: { __typename?: 'User' } & Pick<User, 'id' | 'dateOfBirth'>;
};

export type UpdateUserDistanceMutationVariables = {
  distance?: Maybe<Scalars['Int']>;
};

export type UpdateUserDistanceMutation = { __typename?: 'Mutation' } & {
  updateUserDistance: { __typename?: 'User' } & Pick<User, 'id' | 'distance'>;
};

export type UpdateUserEmailMutationVariables = {
  email: Scalars['String'];
};

export type UpdateUserEmailMutation = { __typename?: 'Mutation' } & {
  updateUserEmail: { __typename?: 'User' } & Pick<User, 'id' | 'email'>;
};

export type UpdateUserGenderMutationVariables = {
  gender?: Maybe<Scalars['String']>;
};

export type UpdateUserGenderMutation = { __typename?: 'Mutation' } & {
  updateUserGender: { __typename?: 'User' } & Pick<User, 'id' | 'gender'>;
};

export type UpdateUserMobileMutationVariables = {
  mobile?: Maybe<Scalars['String']>;
};

export type UpdateUserMobileMutation = { __typename?: 'Mutation' } & {
  updateUserMobile: { __typename?: 'User' } & Pick<User, 'id' | 'mobile'>;
};

export type UpdateUserNameMutationVariables = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UpdateUserNameMutation = { __typename?: 'Mutation' } & {
  updateUserName: { __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName'>;
};

export type RegisterUserMutationVariables = {
  user: RegisterUserInput;
  password: Scalars['String'];
};

export type RegisterUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'registerUser'>;

export type ResetPasswordInitiateMutationVariables = {
  email: Scalars['String'];
};

export type ResetPasswordInitiateMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPasswordInitiate'>;

export type SignInMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInMutation = { __typename?: 'Mutation' } & {
  signIn: { __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName' | 'username'>;
};

export type ResetPasswordMutationVariables = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'resetPassword'>;

export type RetrieveResetPasswordTokenMutationVariables = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type RetrieveResetPasswordTokenMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'retrieveResetPasswordToken'
>;

export type VerifyUserMutationVariables = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type VerifyUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'verifyUser'>;

export type CreateMessageMutationVariables = {
  message: MessageInput;
};

export type CreateMessageMutation = { __typename?: 'Mutation' } & {
  createMessage: { __typename?: 'Message' } & Pick<Message, 'id'>;
};

export type GetMeQueryVariables = {};

export type GetMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id' | 'avatarUrl' | 'email' | 'distance'>;
};

export type GetOfferByIdQueryVariables = {
  offerId: Scalars['String'];
};

export type GetOfferByIdQuery = { __typename?: 'Query' } & {
  offer: { __typename?: 'Offer' } & Pick<Offer, 'id' | 'sourceItemId' | 'targetItemId'> & {
      sourceItem: { __typename?: 'Item' } & Pick<Item, 'title' | 'imageUrls'> & {
          createdByUser: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName' | 'avatarUrl'>;
        };
      targetItem: { __typename?: 'Item' } & Pick<Item, 'title' | 'imageUrls'> & {
          createdByUser: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName' | 'avatarUrl'>;
        };
      messages: Array<
        { __typename?: 'Message' } & Pick<
          Message,
          'id' | 'offerId' | 'messageText' | 'messageReadAt' | 'createdByUserId'
        >
      >;
    };
};

export type MarkMessagesAsReadMutationVariables = {
  offerId: Scalars['String'];
};

export type MarkMessagesAsReadMutation = { __typename?: 'Mutation' } & {
  markMessagesAsRead: { __typename?: 'Offer' } & Pick<Offer, 'id'>;
};

export type GetItemByItemIdQueryVariables = {
  itemId: Scalars['Uuid'];
};

export type GetItemByItemIdQuery = { __typename?: 'Query' } & {
  item: { __typename?: 'Item' } & Pick<
    Item,
    'id' | 'title' | 'description' | 'askingPrice' | 'isSwapOnly' | 'categories' | 'imageUrls'
  >;
};

export type GetMyIdQueryVariables = {};

export type GetMyIdQuery = { __typename?: 'Query' } & { me: { __typename?: 'User' } & Pick<User, 'id'> };

export type UpdateItemMutationVariables = {
  id: Scalars['Uuid'];
  item: ItemInput;
};

export type UpdateItemMutation = { __typename?: 'Mutation' } & {
  updateItem: { __typename?: 'Item' } & Pick<Item, 'id' | 'mainImageUrl'>;
};

export type GetMyNameQueryVariables = {};

export type GetMyNameQuery = { __typename?: 'Query' } & { me: { __typename?: 'User' } & Pick<User, 'firstName'> };

export type CreateOfferMutationVariables = {
  sourceItemId: Scalars['Uuid'];
  targetItemId: Scalars['Uuid'];
  sourceStatus: Scalars['Int'];
};

export type CreateOfferMutation = { __typename?: 'Mutation' } & {
  createOffer: { __typename?: 'Offer' } & Pick<
    Offer,
    'id' | 'sourceItemId' | 'targetItemId' | 'createdAt' | 'cash' | 'sourceStatus' | 'targeteStatus'
  >;
};

export type DismissItemMutationVariables = {
  sourceItemId?: Maybe<Scalars['Uuid']>;
  targetItemId: Scalars['Uuid'];
};

export type DismissItemMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'dismissItem'>;

export type GetMyItemFeedQueryVariables = {
  amount?: Maybe<Scalars['Decimal']>;
  categories?: Maybe<Array<Scalars['String']>>;
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Decimal']>;
  latitude?: Maybe<Scalars['Decimal']>;
  longitude?: Maybe<Scalars['Decimal']>;
  inMiles?: Maybe<Scalars['Boolean']>;
};

export type GetMyItemFeedQuery = { __typename?: 'Query' } & {
  items: { __typename?: 'PaginatedOfItem' } & Pick<PaginatedOfItem, 'cursor' | 'hasNextPage' | 'totalCount'> & {
      data: Array<
        { __typename?: 'Item' } & Pick<Item, 'id' | 'mainImageUrl' | 'title' | 'askingPrice' | 'longitude' | 'latitude'>
      >;
    };
};

export type GetMyItemsQueryVariables = {};

export type GetMyItemsQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & {
    items: Array<
      { __typename?: 'Item' } & Pick<Item, 'id' | 'title' | 'askingPrice' | 'mainImageUrl' | 'longitude' | 'latitude'>
    >;
  };
};

export type UpdateItemLocationMutationVariables = {
  userId: Scalars['Uuid'];
  longitude: Scalars['Decimal'];
  latitude: Scalars['Decimal'];
};

export type UpdateItemLocationMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'updateItemLocation'>;

export type GetItemDetailsByItemIdQueryVariables = {
  itemId: Scalars['Uuid'];
};

export type GetItemDetailsByItemIdQuery = { __typename?: 'Query' } & {
  item: { __typename?: 'Item' } & Pick<
    Item,
    'id' | 'askingPrice' | 'categories' | 'description' | 'imageUrls' | 'title' | 'isSwapOnly'
  > & { createdByUser: { __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatarUrl'> };
};

export type GetOffersQueryVariables = {};

export type GetOffersQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id'> & {
      offers: Array<
        { __typename?: 'Offer' } & Pick<Offer, 'id' | 'createdAt' | 'sourceItemId' | 'targetItemId'> & {
            sourceItem: { __typename?: 'Item' } & Pick<Item, 'title' | 'mainImageUrl'> & {
                createdByUser: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName' | 'avatarUrl'>;
              };
            targetItem: { __typename?: 'Item' } & Pick<Item, 'title' | 'mainImageUrl'> & {
                createdByUser: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName' | 'avatarUrl'>;
              };
            messages: Array<
              { __typename?: 'Message' } & Pick<
                Message,
                'id' | 'offerId' | 'messageText' | 'messageReadAt' | 'createdByUserId'
              >
            >;
          }
      >;
    };
};

export type CreateItemMutationVariables = {
  item: ItemInput;
};

export type CreateItemMutation = { __typename?: 'Mutation' } & {
  createItem: { __typename?: 'Item' } & Pick<Item, 'id'> & {
      createdByUser: { __typename?: 'User' } & Pick<User, 'id'> & {
          items: Array<{ __typename?: 'Item' } & Pick<Item, 'id' | 'mainImageUrl'>>;
        };
    };
};

export type GetCategoriesQueryVariables = {};

export type GetCategoriesQuery = { __typename?: 'Query' } & Pick<Query, 'categories'>;

export type GetExtendedOffersQueryVariables = {};

export type GetExtendedOffersQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'id'> & {
      offers: Array<
        { __typename?: 'Offer' } & Pick<Offer, 'id' | 'createdAt' | 'sourceItemId' | 'targetItemId'> & {
            sourceItem: { __typename?: 'Item' } & Pick<Item, 'id' | 'title' | 'mainImageUrl' | 'imageUrls'> & {
                createdByUser: { __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatarUrl'>;
              };
            targetItem: { __typename?: 'Item' } & Pick<Item, 'id' | 'title' | 'mainImageUrl' | 'imageUrls'> & {
                createdByUser: { __typename?: 'User' } & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatarUrl'>;
              };
          }
      >;
    };
};

export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const ArchiveItemDocument = gql`
  mutation ArchiveItem($itemId: Uuid!) {
    archiveItem(itemId: $itemId)
  }
`;
export type ArchiveItemMutationFn = ApolloReactCommon.MutationFunction<
  ArchiveItemMutation,
  ArchiveItemMutationVariables
>;

/**
 * __useArchiveItemMutation__
 *
 * To run a mutation, you first call `useArchiveItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveItemMutation, { data, loading, error }] = useArchiveItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useArchiveItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ArchiveItemMutation, ArchiveItemMutationVariables>,
) {
  return ApolloReactHooks.useMutation<ArchiveItemMutation, ArchiveItemMutationVariables>(
    ArchiveItemDocument,
    baseOptions,
  );
}
export type ArchiveItemMutationHookResult = ReturnType<typeof useArchiveItemMutation>;
export type ArchiveItemMutationResult = ApolloReactCommon.MutationResult<ArchiveItemMutation>;
export type ArchiveItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ArchiveItemMutation,
  ArchiveItemMutationVariables
>;
export const GetMyProfileDocument = gql`
  query GetMyProfile {
    me {
      id
      avatarUrl
      blurb
      firstName
      lastName
      email
      mobile
      gender
      dateOfBirth
      distance
      items {
        id
        mainImageUrl
      }
    }
  }
`;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, baseOptions);
}
export function useGetMyProfileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(
    GetMyProfileDocument,
    baseOptions,
  );
}
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileQueryResult = ApolloReactCommon.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const GetMyAvatarAndBlurbDocument = gql`
  query GetMyAvatarAndBlurb {
    me {
      id
      avatarUrl
      blurb
    }
  }
`;

/**
 * __useGetMyAvatarAndBlurbQuery__
 *
 * To run a query within a React component, call `useGetMyAvatarAndBlurbQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAvatarAndBlurbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAvatarAndBlurbQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAvatarAndBlurbQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyAvatarAndBlurbQuery, GetMyAvatarAndBlurbQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetMyAvatarAndBlurbQuery, GetMyAvatarAndBlurbQueryVariables>(
    GetMyAvatarAndBlurbDocument,
    baseOptions,
  );
}
export function useGetMyAvatarAndBlurbLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyAvatarAndBlurbQuery, GetMyAvatarAndBlurbQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyAvatarAndBlurbQuery, GetMyAvatarAndBlurbQueryVariables>(
    GetMyAvatarAndBlurbDocument,
    baseOptions,
  );
}
export type GetMyAvatarAndBlurbQueryHookResult = ReturnType<typeof useGetMyAvatarAndBlurbQuery>;
export type GetMyAvatarAndBlurbLazyQueryHookResult = ReturnType<typeof useGetMyAvatarAndBlurbLazyQuery>;
export type GetMyAvatarAndBlurbQueryResult = ApolloReactCommon.QueryResult<
  GetMyAvatarAndBlurbQuery,
  GetMyAvatarAndBlurbQueryVariables
>;
export const UpdateUserProfileDocument = gql`
  mutation UpdateUserProfile($blurb: String, $avatarUrl: String) {
    updateUserProfile(blurb: $blurb, avatarUrl: $avatarUrl) {
      id
      blurb
      avatarUrl
    }
  }
`;
export type UpdateUserProfileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      blurb: // value for 'blurb'
 *      avatarUrl: // value for 'avatarUrl'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    UpdateUserProfileDocument,
    baseOptions,
  );
}
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = ApolloReactCommon.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;
export const UpdateUserDateOfBirthDocument = gql`
  mutation UpdateUserDateOfBirth($dateOfBirth: String) {
    updateUserDateOfBirth(dateOfBirth: $dateOfBirth) {
      id
      dateOfBirth
    }
  }
`;
export type UpdateUserDateOfBirthMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserDateOfBirthMutation,
  UpdateUserDateOfBirthMutationVariables
>;

/**
 * __useUpdateUserDateOfBirthMutation__
 *
 * To run a mutation, you first call `useUpdateUserDateOfBirthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDateOfBirthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDateOfBirthMutation, { data, loading, error }] = useUpdateUserDateOfBirthMutation({
 *   variables: {
 *      dateOfBirth: // value for 'dateOfBirth'
 *   },
 * });
 */
export function useUpdateUserDateOfBirthMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserDateOfBirthMutation,
    UpdateUserDateOfBirthMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateUserDateOfBirthMutation, UpdateUserDateOfBirthMutationVariables>(
    UpdateUserDateOfBirthDocument,
    baseOptions,
  );
}
export type UpdateUserDateOfBirthMutationHookResult = ReturnType<typeof useUpdateUserDateOfBirthMutation>;
export type UpdateUserDateOfBirthMutationResult = ApolloReactCommon.MutationResult<UpdateUserDateOfBirthMutation>;
export type UpdateUserDateOfBirthMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserDateOfBirthMutation,
  UpdateUserDateOfBirthMutationVariables
>;
export const UpdateUserDistanceDocument = gql`
  mutation UpdateUserDistance($distance: Int) {
    updateUserDistance(distance: $distance) {
      id
      distance
    }
  }
`;
export type UpdateUserDistanceMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserDistanceMutation,
  UpdateUserDistanceMutationVariables
>;

/**
 * __useUpdateUserDistanceMutation__
 *
 * To run a mutation, you first call `useUpdateUserDistanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDistanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDistanceMutation, { data, loading, error }] = useUpdateUserDistanceMutation({
 *   variables: {
 *      distance: // value for 'distance'
 *   },
 * });
 */
export function useUpdateUserDistanceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserDistanceMutation, UpdateUserDistanceMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserDistanceMutation, UpdateUserDistanceMutationVariables>(
    UpdateUserDistanceDocument,
    baseOptions,
  );
}
export type UpdateUserDistanceMutationHookResult = ReturnType<typeof useUpdateUserDistanceMutation>;
export type UpdateUserDistanceMutationResult = ApolloReactCommon.MutationResult<UpdateUserDistanceMutation>;
export type UpdateUserDistanceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserDistanceMutation,
  UpdateUserDistanceMutationVariables
>;
export const UpdateUserEmailDocument = gql`
  mutation UpdateUserEmail($email: String!) {
    updateUserEmail(email: $email) {
      id
      email
    }
  }
`;
export type UpdateUserEmailMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>;

/**
 * __useUpdateUserEmailMutation__
 *
 * To run a mutation, you first call `useUpdateUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserEmailMutation, { data, loading, error }] = useUpdateUserEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>(
    UpdateUserEmailDocument,
    baseOptions,
  );
}
export type UpdateUserEmailMutationHookResult = ReturnType<typeof useUpdateUserEmailMutation>;
export type UpdateUserEmailMutationResult = ApolloReactCommon.MutationResult<UpdateUserEmailMutation>;
export type UpdateUserEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>;
export const UpdateUserGenderDocument = gql`
  mutation UpdateUserGender($gender: String) {
    updateUserGender(gender: $gender) {
      id
      gender
    }
  }
`;
export type UpdateUserGenderMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserGenderMutation,
  UpdateUserGenderMutationVariables
>;

/**
 * __useUpdateUserGenderMutation__
 *
 * To run a mutation, you first call `useUpdateUserGenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserGenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserGenderMutation, { data, loading, error }] = useUpdateUserGenderMutation({
 *   variables: {
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useUpdateUserGenderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserGenderMutation, UpdateUserGenderMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserGenderMutation, UpdateUserGenderMutationVariables>(
    UpdateUserGenderDocument,
    baseOptions,
  );
}
export type UpdateUserGenderMutationHookResult = ReturnType<typeof useUpdateUserGenderMutation>;
export type UpdateUserGenderMutationResult = ApolloReactCommon.MutationResult<UpdateUserGenderMutation>;
export type UpdateUserGenderMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserGenderMutation,
  UpdateUserGenderMutationVariables
>;
export const UpdateUserMobileDocument = gql`
  mutation UpdateUserMobile($mobile: String) {
    updateUserMobile(mobile: $mobile) {
      id
      mobile
    }
  }
`;
export type UpdateUserMobileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMobileMutation,
  UpdateUserMobileMutationVariables
>;

/**
 * __useUpdateUserMobileMutation__
 *
 * To run a mutation, you first call `useUpdateUserMobileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMobileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMobileMutation, { data, loading, error }] = useUpdateUserMobileMutation({
 *   variables: {
 *      mobile: // value for 'mobile'
 *   },
 * });
 */
export function useUpdateUserMobileMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMobileMutation, UpdateUserMobileMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserMobileMutation, UpdateUserMobileMutationVariables>(
    UpdateUserMobileDocument,
    baseOptions,
  );
}
export type UpdateUserMobileMutationHookResult = ReturnType<typeof useUpdateUserMobileMutation>;
export type UpdateUserMobileMutationResult = ApolloReactCommon.MutationResult<UpdateUserMobileMutation>;
export type UpdateUserMobileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMobileMutation,
  UpdateUserMobileMutationVariables
>;
export const UpdateUserNameDocument = gql`
  mutation UpdateUserName($firstName: String!, $lastName: String!) {
    updateUserName(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;
export type UpdateUserNameMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables
>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateUserNameMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(
    UpdateUserNameDocument,
    baseOptions,
  );
}
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = ApolloReactCommon.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables
>;
export const RegisterUserDocument = gql`
  mutation RegisterUser($user: RegisterUserInput!, $password: String!) {
    registerUser(user: $user, password: $password)
  }
`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
    baseOptions,
  );
}
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const ResetPasswordInitiateDocument = gql`
  mutation ResetPasswordInitiate($email: String!) {
    resetPasswordInitiate(email: $email)
  }
`;
export type ResetPasswordInitiateMutationFn = ApolloReactCommon.MutationFunction<
  ResetPasswordInitiateMutation,
  ResetPasswordInitiateMutationVariables
>;

/**
 * __useResetPasswordInitiateMutation__
 *
 * To run a mutation, you first call `useResetPasswordInitiateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordInitiateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordInitiateMutation, { data, loading, error }] = useResetPasswordInitiateMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordInitiateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordInitiateMutation,
    ResetPasswordInitiateMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ResetPasswordInitiateMutation, ResetPasswordInitiateMutationVariables>(
    ResetPasswordInitiateDocument,
    baseOptions,
  );
}
export type ResetPasswordInitiateMutationHookResult = ReturnType<typeof useResetPasswordInitiateMutation>;
export type ResetPasswordInitiateMutationResult = ApolloReactCommon.MutationResult<ResetPasswordInitiateMutation>;
export type ResetPasswordInitiateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordInitiateMutation,
  ResetPasswordInitiateMutationVariables
>;
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
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($email: String!, $newPassword: String!, $resetPasswordToken: String!) {
    resetPassword(email: $email, newPassword: $newPassword, resetPasswordToken: $resetPasswordToken)
  }
`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      newPassword: // value for 'newPassword'
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    baseOptions,
  );
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const RetrieveResetPasswordTokenDocument = gql`
  mutation RetrieveResetPasswordToken($email: String!, $verificationCode: String!) {
    retrieveResetPasswordToken(email: $email, verificationCode: $verificationCode)
  }
`;
export type RetrieveResetPasswordTokenMutationFn = ApolloReactCommon.MutationFunction<
  RetrieveResetPasswordTokenMutation,
  RetrieveResetPasswordTokenMutationVariables
>;

/**
 * __useRetrieveResetPasswordTokenMutation__
 *
 * To run a mutation, you first call `useRetrieveResetPasswordTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetrieveResetPasswordTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retrieveResetPasswordTokenMutation, { data, loading, error }] = useRetrieveResetPasswordTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useRetrieveResetPasswordTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RetrieveResetPasswordTokenMutation,
    RetrieveResetPasswordTokenMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<RetrieveResetPasswordTokenMutation, RetrieveResetPasswordTokenMutationVariables>(
    RetrieveResetPasswordTokenDocument,
    baseOptions,
  );
}
export type RetrieveResetPasswordTokenMutationHookResult = ReturnType<typeof useRetrieveResetPasswordTokenMutation>;
export type RetrieveResetPasswordTokenMutationResult = ApolloReactCommon.MutationResult<
  RetrieveResetPasswordTokenMutation
>;
export type RetrieveResetPasswordTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RetrieveResetPasswordTokenMutation,
  RetrieveResetPasswordTokenMutationVariables
>;
export const VerifyUserDocument = gql`
  mutation VerifyUser($email: String!, $verificationCode: String!) {
    verifyUser(email: $email, verificationCode: $verificationCode)
  }
`;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useVerifyUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, baseOptions);
}
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = ApolloReactCommon.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  VerifyUserMutation,
  VerifyUserMutationVariables
>;
export const CreateMessageDocument = gql`
  mutation CreateMessage($message: MessageInput!) {
    createMessage(message: $message) {
      id
    }
  }
`;
export type CreateMessageMutationFn = ApolloReactCommon.MutationFunction<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
    CreateMessageDocument,
    baseOptions,
  );
}
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMessageMutation,
  CreateMessageMutationVariables
>;
export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      avatarUrl
      email
      distance
    }
  }
`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
}
export function useGetMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetOfferByIdDocument = gql`
  query GetOfferById($offerId: String!) {
    offer(offerId: $offerId) {
      id
      sourceItemId
      sourceItem {
        title
        createdByUser {
          firstName
          lastName
          avatarUrl
        }
        imageUrls
      }
      targetItemId
      targetItem {
        title
        createdByUser {
          firstName
          lastName
          avatarUrl
        }
        imageUrls
      }
      messages {
        id
        offerId
        messageText
        messageReadAt
        createdByUserId
      }
    }
  }
`;

/**
 * __useGetOfferByIdQuery__
 *
 * To run a query within a React component, call `useGetOfferByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfferByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfferByIdQuery({
 *   variables: {
 *      offerId: // value for 'offerId'
 *   },
 * });
 */
export function useGetOfferByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetOfferByIdQuery, GetOfferByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(GetOfferByIdDocument, baseOptions);
}
export function useGetOfferByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOfferByIdQuery, GetOfferByIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetOfferByIdQuery, GetOfferByIdQueryVariables>(
    GetOfferByIdDocument,
    baseOptions,
  );
}
export type GetOfferByIdQueryHookResult = ReturnType<typeof useGetOfferByIdQuery>;
export type GetOfferByIdLazyQueryHookResult = ReturnType<typeof useGetOfferByIdLazyQuery>;
export type GetOfferByIdQueryResult = ApolloReactCommon.QueryResult<GetOfferByIdQuery, GetOfferByIdQueryVariables>;
export const MarkMessagesAsReadDocument = gql`
  mutation MarkMessagesAsRead($offerId: String!) {
    markMessagesAsRead(offerId: $offerId) {
      id
    }
  }
`;
export type MarkMessagesAsReadMutationFn = ApolloReactCommon.MutationFunction<
  MarkMessagesAsReadMutation,
  MarkMessagesAsReadMutationVariables
>;

/**
 * __useMarkMessagesAsReadMutation__
 *
 * To run a mutation, you first call `useMarkMessagesAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkMessagesAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markMessagesAsReadMutation, { data, loading, error }] = useMarkMessagesAsReadMutation({
 *   variables: {
 *      offerId: // value for 'offerId'
 *   },
 * });
 */
export function useMarkMessagesAsReadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>,
) {
  return ApolloReactHooks.useMutation<MarkMessagesAsReadMutation, MarkMessagesAsReadMutationVariables>(
    MarkMessagesAsReadDocument,
    baseOptions,
  );
}
export type MarkMessagesAsReadMutationHookResult = ReturnType<typeof useMarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationResult = ApolloReactCommon.MutationResult<MarkMessagesAsReadMutation>;
export type MarkMessagesAsReadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkMessagesAsReadMutation,
  MarkMessagesAsReadMutationVariables
>;
export const GetItemByItemIdDocument = gql`
  query GetItemByItemId($itemId: Uuid!) {
    item(itemId: $itemId) {
      id
      title
      description
      askingPrice
      isSwapOnly
      categories
      imageUrls
    }
  }
`;

/**
 * __useGetItemByItemIdQuery__
 *
 * To run a query within a React component, call `useGetItemByItemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemByItemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemByItemIdQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetItemByItemIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetItemByItemIdQuery, GetItemByItemIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetItemByItemIdQuery, GetItemByItemIdQueryVariables>(
    GetItemByItemIdDocument,
    baseOptions,
  );
}
export function useGetItemByItemIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetItemByItemIdQuery, GetItemByItemIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetItemByItemIdQuery, GetItemByItemIdQueryVariables>(
    GetItemByItemIdDocument,
    baseOptions,
  );
}
export type GetItemByItemIdQueryHookResult = ReturnType<typeof useGetItemByItemIdQuery>;
export type GetItemByItemIdLazyQueryHookResult = ReturnType<typeof useGetItemByItemIdLazyQuery>;
export type GetItemByItemIdQueryResult = ApolloReactCommon.QueryResult<
  GetItemByItemIdQuery,
  GetItemByItemIdQueryVariables
>;
export const GetMyIdDocument = gql`
  query GetMyId {
    me {
      id
    }
  }
`;

/**
 * __useGetMyIdQuery__
 *
 * To run a query within a React component, call `useGetMyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyIdQuery, GetMyIdQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyIdQuery, GetMyIdQueryVariables>(GetMyIdDocument, baseOptions);
}
export function useGetMyIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyIdQuery, GetMyIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyIdQuery, GetMyIdQueryVariables>(GetMyIdDocument, baseOptions);
}
export type GetMyIdQueryHookResult = ReturnType<typeof useGetMyIdQuery>;
export type GetMyIdLazyQueryHookResult = ReturnType<typeof useGetMyIdLazyQuery>;
export type GetMyIdQueryResult = ApolloReactCommon.QueryResult<GetMyIdQuery, GetMyIdQueryVariables>;
export const UpdateItemDocument = gql`
  mutation UpdateItem($id: Uuid!, $item: ItemInput!) {
    updateItem(id: $id, item: $item) {
      id
      mainImageUrl
    }
  }
`;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, baseOptions);
}
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateItemMutation,
  UpdateItemMutationVariables
>;
export const GetMyNameDocument = gql`
  query GetMyName {
    me {
      firstName
    }
  }
`;

/**
 * __useGetMyNameQuery__
 *
 * To run a query within a React component, call `useGetMyNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyNameQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyNameQuery, GetMyNameQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetMyNameQuery, GetMyNameQueryVariables>(GetMyNameDocument, baseOptions);
}
export function useGetMyNameLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyNameQuery, GetMyNameQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyNameQuery, GetMyNameQueryVariables>(GetMyNameDocument, baseOptions);
}
export type GetMyNameQueryHookResult = ReturnType<typeof useGetMyNameQuery>;
export type GetMyNameLazyQueryHookResult = ReturnType<typeof useGetMyNameLazyQuery>;
export type GetMyNameQueryResult = ApolloReactCommon.QueryResult<GetMyNameQuery, GetMyNameQueryVariables>;
export const CreateOfferDocument = gql`
  mutation CreateOffer($sourceItemId: Uuid!, $targetItemId: Uuid!, $sourceStatus: Int!) {
    createOffer(sourceItemId: $sourceItemId, targetItemId: $targetItemId, sourceStatus: $sourceStatus) {
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
export type CreateOfferMutationFn = ApolloReactCommon.MutationFunction<
  CreateOfferMutation,
  CreateOfferMutationVariables
>;

/**
 * __useCreateOfferMutation__
 *
 * To run a mutation, you first call `useCreateOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfferMutation, { data, loading, error }] = useCreateOfferMutation({
 *   variables: {
 *      sourceItemId: // value for 'sourceItemId'
 *      targetItemId: // value for 'targetItemId'
 *      sourceStatus: // value for 'sourceStatus'
 *   },
 * });
 */
export function useCreateOfferMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOfferMutation, CreateOfferMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOfferMutation, CreateOfferMutationVariables>(
    CreateOfferDocument,
    baseOptions,
  );
}
export type CreateOfferMutationHookResult = ReturnType<typeof useCreateOfferMutation>;
export type CreateOfferMutationResult = ApolloReactCommon.MutationResult<CreateOfferMutation>;
export type CreateOfferMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOfferMutation,
  CreateOfferMutationVariables
>;
export const DismissItemDocument = gql`
  mutation DismissItem($sourceItemId: Uuid, $targetItemId: Uuid!) {
    dismissItem(sourceItemId: $sourceItemId, targetItemId: $targetItemId)
  }
`;
export type DismissItemMutationFn = ApolloReactCommon.MutationFunction<
  DismissItemMutation,
  DismissItemMutationVariables
>;

/**
 * __useDismissItemMutation__
 *
 * To run a mutation, you first call `useDismissItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDismissItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dismissItemMutation, { data, loading, error }] = useDismissItemMutation({
 *   variables: {
 *      sourceItemId: // value for 'sourceItemId'
 *      targetItemId: // value for 'targetItemId'
 *   },
 * });
 */
export function useDismissItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DismissItemMutation, DismissItemMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DismissItemMutation, DismissItemMutationVariables>(
    DismissItemDocument,
    baseOptions,
  );
}
export type DismissItemMutationHookResult = ReturnType<typeof useDismissItemMutation>;
export type DismissItemMutationResult = ApolloReactCommon.MutationResult<DismissItemMutation>;
export type DismissItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DismissItemMutation,
  DismissItemMutationVariables
>;
export const GetMyItemFeedDocument = gql`
  query GetMyItemFeed(
    $amount: Decimal
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
        title
        askingPrice
        longitude
        latitude
      }
      hasNextPage
      totalCount
    }
  }
`;

/**
 * __useGetMyItemFeedQuery__
 *
 * To run a query within a React component, call `useGetMyItemFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyItemFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyItemFeedQuery({
 *   variables: {
 *      amount: // value for 'amount'
 *      categories: // value for 'categories'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      distance: // value for 'distance'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      inMiles: // value for 'inMiles'
 *   },
 * });
 */
export function useGetMyItemFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyItemFeedQuery, GetMyItemFeedQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetMyItemFeedQuery, GetMyItemFeedQueryVariables>(GetMyItemFeedDocument, baseOptions);
}
export function useGetMyItemFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyItemFeedQuery, GetMyItemFeedQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyItemFeedQuery, GetMyItemFeedQueryVariables>(
    GetMyItemFeedDocument,
    baseOptions,
  );
}
export type GetMyItemFeedQueryHookResult = ReturnType<typeof useGetMyItemFeedQuery>;
export type GetMyItemFeedLazyQueryHookResult = ReturnType<typeof useGetMyItemFeedLazyQuery>;
export type GetMyItemFeedQueryResult = ApolloReactCommon.QueryResult<GetMyItemFeedQuery, GetMyItemFeedQueryVariables>;
export const GetMyItemsDocument = gql`
  query GetMyItems {
    me {
      items {
        id
        title
        askingPrice
        mainImageUrl
        longitude
        latitude
      }
    }
  }
`;

/**
 * __useGetMyItemsQuery__
 *
 * To run a query within a React component, call `useGetMyItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyItemsQuery, GetMyItemsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetMyItemsQuery, GetMyItemsQueryVariables>(GetMyItemsDocument, baseOptions);
}
export function useGetMyItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyItemsQuery, GetMyItemsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetMyItemsQuery, GetMyItemsQueryVariables>(GetMyItemsDocument, baseOptions);
}
export type GetMyItemsQueryHookResult = ReturnType<typeof useGetMyItemsQuery>;
export type GetMyItemsLazyQueryHookResult = ReturnType<typeof useGetMyItemsLazyQuery>;
export type GetMyItemsQueryResult = ApolloReactCommon.QueryResult<GetMyItemsQuery, GetMyItemsQueryVariables>;
export const UpdateItemLocationDocument = gql`
  mutation UpdateItemLocation($userId: Uuid!, $longitude: Decimal!, $latitude: Decimal!) {
    updateItemLocation(userId: $userId, longitude: $longitude, latitude: $latitude)
  }
`;
export type UpdateItemLocationMutationFn = ApolloReactCommon.MutationFunction<
  UpdateItemLocationMutation,
  UpdateItemLocationMutationVariables
>;

/**
 * __useUpdateItemLocationMutation__
 *
 * To run a mutation, you first call `useUpdateItemLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemLocationMutation, { data, loading, error }] = useUpdateItemLocationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      longitude: // value for 'longitude'
 *      latitude: // value for 'latitude'
 *   },
 * });
 */
export function useUpdateItemLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemLocationMutation, UpdateItemLocationMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateItemLocationMutation, UpdateItemLocationMutationVariables>(
    UpdateItemLocationDocument,
    baseOptions,
  );
}
export type UpdateItemLocationMutationHookResult = ReturnType<typeof useUpdateItemLocationMutation>;
export type UpdateItemLocationMutationResult = ApolloReactCommon.MutationResult<UpdateItemLocationMutation>;
export type UpdateItemLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateItemLocationMutation,
  UpdateItemLocationMutationVariables
>;
export const GetItemDetailsByItemIdDocument = gql`
  query GetItemDetailsByItemId($itemId: Uuid!) {
    item(itemId: $itemId) {
      id
      askingPrice
      categories
      description
      imageUrls
      title
      isSwapOnly
      createdByUser {
        id
        firstName
        lastName
        avatarUrl
      }
    }
  }
`;

/**
 * __useGetItemDetailsByItemIdQuery__
 *
 * To run a query within a React component, call `useGetItemDetailsByItemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemDetailsByItemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemDetailsByItemIdQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetItemDetailsByItemIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetItemDetailsByItemIdQuery, GetItemDetailsByItemIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetItemDetailsByItemIdQuery, GetItemDetailsByItemIdQueryVariables>(
    GetItemDetailsByItemIdDocument,
    baseOptions,
  );
}
export function useGetItemDetailsByItemIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetItemDetailsByItemIdQuery,
    GetItemDetailsByItemIdQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetItemDetailsByItemIdQuery, GetItemDetailsByItemIdQueryVariables>(
    GetItemDetailsByItemIdDocument,
    baseOptions,
  );
}
export type GetItemDetailsByItemIdQueryHookResult = ReturnType<typeof useGetItemDetailsByItemIdQuery>;
export type GetItemDetailsByItemIdLazyQueryHookResult = ReturnType<typeof useGetItemDetailsByItemIdLazyQuery>;
export type GetItemDetailsByItemIdQueryResult = ApolloReactCommon.QueryResult<
  GetItemDetailsByItemIdQuery,
  GetItemDetailsByItemIdQueryVariables
>;
export const GetOffersDocument = gql`
  query GetOffers {
    me {
      id
      offers {
        id
        createdAt
        sourceItemId
        sourceItem {
          title
          createdByUser {
            firstName
            lastName
            avatarUrl
          }
          mainImageUrl
        }
        targetItemId
        targetItem {
          title
          createdByUser {
            firstName
            lastName
            avatarUrl
          }
          mainImageUrl
        }
        messages {
          id
          offerId
          messageText
          messageReadAt
          createdByUserId
        }
      }
    }
  }
`;

/**
 * __useGetOffersQuery__
 *
 * To run a query within a React component, call `useGetOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOffersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOffersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetOffersQuery, GetOffersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, baseOptions);
}
export function useGetOffersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOffersQuery, GetOffersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetOffersQuery, GetOffersQueryVariables>(GetOffersDocument, baseOptions);
}
export type GetOffersQueryHookResult = ReturnType<typeof useGetOffersQuery>;
export type GetOffersLazyQueryHookResult = ReturnType<typeof useGetOffersLazyQuery>;
export type GetOffersQueryResult = ApolloReactCommon.QueryResult<GetOffersQuery, GetOffersQueryVariables>;
export const CreateItemDocument = gql`
  mutation CreateItem($item: ItemInput!) {
    createItem(item: $item) {
      id
      createdByUser {
        id
        items {
          id
          mainImageUrl
        }
      }
    }
  }
`;
export type CreateItemMutationFn = ApolloReactCommon.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateItemMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, baseOptions);
}
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = ApolloReactCommon.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateItemMutation,
  CreateItemMutationVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    baseOptions,
  );
}
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetExtendedOffersDocument = gql`
  query GetExtendedOffers {
    me {
      id
      offers {
        id
        createdAt
        sourceItemId
        sourceItem {
          id
          title
          mainImageUrl
          createdByUser {
            id
            firstName
            lastName
            avatarUrl
          }
          imageUrls
        }
        targetItemId
        targetItem {
          id
          title
          mainImageUrl
          createdByUser {
            id
            firstName
            lastName
            avatarUrl
          }
          imageUrls
        }
      }
    }
  }
`;

/**
 * __useGetExtendedOffersQuery__
 *
 * To run a query within a React component, call `useGetExtendedOffersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtendedOffersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtendedOffersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExtendedOffersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetExtendedOffersQuery, GetExtendedOffersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetExtendedOffersQuery, GetExtendedOffersQueryVariables>(
    GetExtendedOffersDocument,
    baseOptions,
  );
}
export function useGetExtendedOffersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExtendedOffersQuery, GetExtendedOffersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetExtendedOffersQuery, GetExtendedOffersQueryVariables>(
    GetExtendedOffersDocument,
    baseOptions,
  );
}
export type GetExtendedOffersQueryHookResult = ReturnType<typeof useGetExtendedOffersQuery>;
export type GetExtendedOffersLazyQueryHookResult = ReturnType<typeof useGetExtendedOffersLazyQuery>;
export type GetExtendedOffersQueryResult = ApolloReactCommon.QueryResult<
  GetExtendedOffersQuery,
  GetExtendedOffersQueryVariables
>;
