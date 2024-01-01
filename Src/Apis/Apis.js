export const apiKey = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs'
// export const apiKey = 'AIzaSyATTgMgx1CkzrcTjaJ3Y7clEdpMd51-WLo'
import axios from 'axios';

const GRAPHQL_ENDPOINT = 'http://13.50.221.83/';
// const GRAPHQL_ENDPOINT = 'http://172.16.0.50:5002/';

export const getAddressFromLatLng = async (latitude, longitude) => {
  try {

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );


    console.log('responseresponseresponse', response);
    if (response.data.results.length > 0) {
      const address = response.data.results[0].formatted_address;

      console.log('addressaddress', address);
      return address

    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    throw new Error('Error fetching address: ' + error);
  }
};


export const getChatlist = () => {
  const graphqlQuerychat = {
    query: `
      query Chat {
         chat {
        createdAt
        createdByUserId
        id
        messageReadAt
        messageText
        offerId
        targetItem {
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
        targetUser {
            avatarUrl
            blurb
            createdAt
            dateOfBirth
            distance
            email
            fCMToken
            firstName
            gender
            id
            isChatNotificationsEnabled
            isMatchNotification
            lastName
            latitude
            longitude
            mobile
            username
        }
         sourceItem {
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
      }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlQuerychat)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};

export const getMyallItems = () => {
  const graphqlQuerychat = {
    query: `
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
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlQuerychat)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};



export const getallchMessages = (offerId) => {
  const graphqlQuery = {
    query: `
      query {
        messages(offerId: "${offerId}") {
          createdAt
          createdByUserId
          id
          messageReadAt
          messageText
          offerId
          targetUser {
            avatarUrl
            blurb
            createdAt
            dateOfBirth
            distance
            email
            fCMToken
            firstName
            gender
            id
            isChatNotificationsEnabled
            isMatchNotification
            lastName
            latitude
            longitude
            mobile
            username
          }
        }
      }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlQuery)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data; // Return the data for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      throw error; // Rethrow the error for handling it where the function is called
    });
};




export const createMessage = (messageText, offerId) => {
  const graphqlMutation = {
    query: `
      mutation CreateMessage {
        createMessage(message: { messageText: "${messageText}", offerId: "${offerId}" }) {
          createdAt
          createdByUserId
          id
          messageReadAt
          messageText
          offerId
        }
      }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlMutation)
    .then(response => {
      // Handle the response data
      console.log('Message created:', response.data);
      return response.data; // Return the data for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error creating message:', error);
      throw error; // Rethrow the error for handling it where the function is called
    });
};
export const unMatchOffer = (offerId) => {
  const graphqlMutation = {
    query: `
      mutation UnmatchOffer {
        unmatchOffer(offerId: "${offerId}")
      }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlMutation)
    .then(response => {
      // Handle the response data
      console.log('unmatchh created:', response);
      return response.data; // Return the data for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error creating message:', error);
      throw error; // Rethrow the error for handling it where the function is called
    });
};
export const markmessageasread = (offerId) => {
  const graphqlMutation = {
    query: `
      mutation MarkMessagesAsRead {
        markMessagesAsRead(offerId: "${offerId}") {
          cash
          createdAt
          id
          sourceItemId
          sourceStatus
          targeteStatus
          targetItemId
        }
      }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, graphqlMutation)
    .then(response => {
      // Handle the response data
      console.log('Message marked as read:', response.data);
      return response.data; // Return the data for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error marking message as read:', error);
      throw error; // Rethrow the error for handling it where the function is called
    });
};


export const getNotificationCount = () => {
  const query = {
    query: `
    {
        notificationCount
    }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, query)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};

export const getmessageCount = () => {
  const query = {
    query: `
    {
        messagesCount
    }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, query)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};
export const markMesegecountzero = () => {
  const mutation = {
    query: `
    mutation {
        markmessageCountZero
    }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, mutation)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};
export const markNotificationAszero = () => {
  const mutation = {
    query: `
    mutation {
        markNotificationAsRead
    }
    `
  };

  return axios.post(GRAPHQL_ENDPOINT, mutation)
    .then(response => {
      // Handle the response data
      console.log('Response:', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
};



export const updateItemLocation = (itemId, latitude, longitude) => {

  console.log('itemId, latitude, longitude', itemId, latitude, longitude);
  const mutation = {
    query: `   mutation {
            updateItemLocation(itemId: "${itemId}", latitude: ${latitude}, longitude: ${longitude})
        }
     `
  };


  return axios.post(GRAPHQL_ENDPOINT, mutation)
    .then(response => {
      // Handle the response data
      console.log('Response:===', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
}


export const updateAllItemsLocation = (userId, latitude, longitude) => {

  console.log('userId, latitude, longitude', userId, latitude, longitude);

  const mutation = {
    query: `
   mutation {
            updateAllItemsLocation(userId: "${userId}", latitude: ${latitude}, longitude: ${longitude}) 
           }
    `
  };


  return axios.post(GRAPHQL_ENDPOINT, mutation)
    .then(response => {
      // Handle the response data
      console.log('Response:====', response.data);
      return response.data;  // You can return the data here for further processing
    })
    .catch(error => {
      // Handle errors
      console.error('Error)()()()()()()()()()()()()(()()()):', error);
      throw error;  // Rethrow the error for handling it where the function is called
    });
}


export const SendCOdverifayAccount = (email) => {
  console.log('email', email);
  const mutation = `
    mutation {
      resetPasswordInitiate(email: "${email}")
    }
  `;

  return axios.post(GRAPHQL_ENDPOINT, {
    query: mutation
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};




export const OtpverifayAccount = (email, verificationCode) => {
  const mutation = `
    mutation {
      retrieveResetPasswordToken(email: "${email}", verificationCode: "${verificationCode}")
    }
  `;

  return axios.post(GRAPHQL_ENDPOINT, {
    query: mutation
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};



export const UserNameUpdate = (firstName, lastName) => {
  const mutation = `
    mutation UpdateUserName {
      updateUserName(firstName: "${firstName}", lastName: "${lastName}") {
        username
      }
    }
  `;

  return axios.post(GRAPHQL_ENDPOINT, {
    query: mutation
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const createItem = async (itemData) => {
  const imageUrlsString = itemData.imageUrls.map(url => `"${url}"`).join(', ');
  const query = `
    mutation CreateItem {
      createItem(
        item: {
          askingPrice: ${itemData.askingPrice}
          categories: "${itemData.categories}"
          description: "${itemData.description}"
          imageUrls: [${imageUrlsString}]
          isSwapOnly: ${itemData.isSwapOnly}
          latitude: ${itemData.latitude}
          longitude: ${itemData.longitude}
          mainImageUrl: "${itemData.mainImageUrl}"
          title: "${itemData.title}"
        }
      ) {
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

  console.log('queryqueryqueryqueryqueryquery', itemData, query);
  return axios.post(GRAPHQL_ENDPOINT, {
    query: query
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const getCategory = async () => {
  const query = `query Categories {
    categories {
        id
        name
    }
}
`;
  console.log('queryqueryqueryqueryqueryquery', query);
  return axios.post(GRAPHQL_ENDPOINT, {
    query: query
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};


export const reportAnitem = async (itemId, title, description) => {
  console.log('itemId, title, description', itemId, title, description);

  const mutation = `
    mutation {
      createItemComplaint(
        complaint: {
          title: "${title}",
          description: "${description}",
          isSolved:false
        }
        itemId: "${itemId}"
      ) {
        id
      }
    }
  `;

  console.log('mutation:', mutation);

  return axios.post(GRAPHQL_ENDPOINT, {
    query: mutation
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};




export const ComplaintAgainstuser = async (userId, title, description) => {
  console.log('userId, title, description', userId, title, description);

  const mutation = `
    mutation {
      createUserComplaint(
        userId: "${userId}",
        complaint: {
          title: "${title}",
          description: "${description}"
        }
      ) {
        id
      }
    }
  `;

  console.log('mutation:', mutation);

  return axios.post(GRAPHQL_ENDPOINT, {
    query: mutation
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};
