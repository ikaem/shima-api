const users2: { username: string; rooms: string[] }[] = [];
const users: { username: string; socketID: string; rooms: string[] }[] = [];
const rooms = ["lobby"];
const rooms2 = [
  {
    name: "lobby",
    // id: 1,
    // messages: [{ author: "admin", content: "have fun everyone" }],
  },
];

export const addUserToRoom = (
  username: string,
  room: string,
  socketId?: string
) => {
  // first check if room exists at all
  if (!rooms.includes(room)) return { error: "This room does not exist" };

  const isUserExist = users.find((user) => user.username === username);

  if (!isUserExist) return { error: "This user does not exist" };

  const isUserInRoom = isUserExist.rooms.includes(room);

  if (isUserInRoom) return { error: "This user is already in the room" };

  // add socket id to the user's object
  if (socketId) isUserExist.socketID = socketId;

  // add room to the user object
  isUserExist.rooms.push(room);

  // replace old user object with new user object
  const userIndex = users.findIndex((user) => user.username);
  users[userIndex] = isUserExist;

  // return username
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
    socketID: "",
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

export const removeUser = (id: string) => {
  if (!id) return { error: "No id provided" };


  // find index of the user
  const userForRemoval = users.find((user) => user.socketID === id);

  if (!userForRemoval) return { error: "No such user" };

  // splice 1 object at index place

  const userIndex = users.findIndex((user) => user.socketID === id);

  users.splice(userIndex, 1);

  // console.log("this is user for emoval:", userForRemoval);

  return { username: userForRemoval.username };
};
