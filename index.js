const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { events, locations, users, participants } = require("./data.json");

const typeDefs = gql`
  # EVENT
  type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    user: User!
    location: Location!
    participants: [Participant!]!
  }

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: Int
    user_id: Int
  }

  # LOCATION
  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # USER
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  # PARTICIPANT
  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
    user: User!
  }

  input CreateParticipantInput {
    user_id: Int!
    event_id: Int!
  }

  input UpdateParticipantInput {
    user_id: Int
    event_id: Int
  }

  # -----
  type DeletedOutput {
    count: Int!
  }

  # -----
  type Query {
    events: [Event!]!
    event(id: Int!): Event!

    locations: [Location!]!
    location(id: Int!): Location!

    users: [User!]!
    user(id: Int!): User!

    participants: [Participant!]!
    participant(id: Int!): Participant!
  }

  type Mutation {
    # EVENT
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: Int!, data: UpdateEventInput!): Event!
    deleteEvent(id: Int!): Event!
    deleteAllEvents: DeletedOutput!

    # LOCATION
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: Int!, data: UpdateLocationInput!): Location!
    deleteLocation(id: Int!): Location!
    deleteAllLocations: DeletedOutput!

    # USER
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
    deleteAllUsers: DeletedOutput!

    # PARTICIPANT
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: Int!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: Int!): Participant!
    deleteAllParticipants: DeletedOutput!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    event: (parents, args) => events.find((event) => event.id === args.id),

    locations: () => locations,
    location: (parents, args) =>
      locations.find((location) => location.id === args.id),

    users: () => users,
    user: (parents, args) => users.find((user) => user.id === args.id),

    participants: () => participants,
    participant: (parents, args) =>
      participants.find((participant) => participant.id === args.id),
  },

  User: {
    events: (parent) => events.filter((event) => event.user_id === parent.id),
  },

  Event: {
    user: (parent) => users.find((user) => user.id === parent.user_id),

    location: (parent) =>
      locations.find((location) => location.id === parent.location_id),

    participants: (parent) =>
      participants.filter((participant) => participant.event_id === parent.id),
  },

  Participant: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
  },

  Mutation: {
    // EVENT
    createEvent: (parent, { data }) => {
      const event = { id: Math.floor(Math.random() * 100000), ...data };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const eventIndex = events.findIndex((event) => event.id === id);

      if (eventIndex === -1) {
        throw new Error("Event not found!");
      }

      const updatedEvent = (events[eventIndex] = {
        ...events[eventIndex],
        ...data,
      });

      return updatedEvent;
    },
    deleteEvent: (parent, { id }) => {
      const eventIndex = events.findIndex((event) => event.id === id);

      if (eventIndex === -1) {
        throw new Error("Event not found!");
      }

      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);

      return deletedEvent;
    },
    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);

      return {
        count: length,
      };
    },

    // LOCATION
    createLocation: (parent, { data }) => {
      const location = { id: Math.floor(Math.random() * 100000), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === id
      );

      if (locationIndex === -1) {
        throw new Error("location not found!");
      }

      const updatedLocation = (locations[locationIndex] = {
        ...locations[locationIndex],
        ...data,
      });

      return updatedLocation;
    },
    deleteLocation: (parent, { id }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === id
      );

      if (locationIndex === -1) {
        throw new Error("location not found!");
      }

      const deletedLocation = locations[locationIndex];
      locations.splice(locationIndex, 1);

      return deletedLocation;
    },
    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);

      return {
        count: length,
      };
    },

    // USER
    createUser: (parent, { data }) => {
      const user = { id: Math.floor(Math.random() * 100000), ...data };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error("user not found!");
      }

      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...data,
      });

      return updatedUser;
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error("user not found!");
      }

      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);

      return deletedUser;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },

    // PARTICIPANT
    createParticipant: (parent, { data }) => {
      const participant = { id: Math.floor(Math.random() * 100000), ...data };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === id
      );

      if (participantIndex === -1) {
        throw new Error("Participant not found!");
      }

      const updatedParticipant = (participants[participantIndex] = {
        ...participants[participantIndex],
        ...data,
      });

      return updatedParticipant;
    },
    deleteParticipant: (parent, { id }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === id
      );

      if (participantIndex === -1) {
        throw new Error("participant not found!");
      }

      const deletedParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);

      return deletedParticipant;
    },
    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);

      return {
        count: length,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
