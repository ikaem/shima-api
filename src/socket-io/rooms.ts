const users: { username: string; rooms: string[] }[] = [];
const users2: { username: string, socketID: string; rooms: string[] }[] = [];

// users.push({ username: "kaem", rooms: ["lobby"] });

const rooms = ["lobby"];
const rooms2 = [
  {
    name: "lobby",
    id: 1,
    messages: [{ author: "admin", content: "have fun everyone" }],
  },
];

export const addUserToRoom = (username: string, room: string) => {
  // first check if room exists at all
  if (!rooms.includes(room)) return { error: "This room does not exist" };

  const isUserExist = users.find((user) => user.username === username);

  if (!isUserExist) return { error: "This user does not exist" };

  const isUserInRoom = isUserExist.rooms.includes(room);

  if (isUserInRoom) return { error: "This user is already in the room" };

  // add room to the user object
  isUserExist.rooms.push(room);

  // replace old user object with new user object
  const userIndex = users.findIndex((user) => user.username);

  users[userIndex] = isUserExist;

  return { username };
};

export const reserveUsername = (username: string) => {
  const isUsernameExist = users.find((user) => {
    return user.username === username;
  });

  if (isUsernameExist)
    return {
      error: "This username is taken",
    };

  users.push({
    username,
    rooms: [],
  });

  return {
    newUser: username,
  };
};

export const createRoom = (roomName: string) => {
  roomName = roomName.trim();

  // check if this room already exists
  const isRoomExist = rooms.includes(roomName);

  if (isRoomExist)
    return {
      error: "Room name is already taken",
    };

  // if it doesnt exist, we add to the array
  rooms.push(roomName);

  //   and we finally can return room name if all is good .
  return {
    roomName,
  };
};

export const removeUser = (username: string) => {
  if (!username) return { error: "No username provided" };
  username = username.trim();

  // find index of the user
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex < 0) return { error: "No such user" };

  // splice 1 object at index place

  users.splice(userIndex, 1);

  return { username };
};
