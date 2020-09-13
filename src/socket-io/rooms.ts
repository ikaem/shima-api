const users: { username: string; rooms: string[] }[] = [];

// users.push({ username: "kaem", rooms: ["lobby"] });

export const addUserToRoom = (username: string, room: string) => {
  const isUserExist = users.find((user) => user.username);

  if (!isUserExist) {
    users.push({
      username,
      rooms: [room],
    });
    return { username };
  }

  const isUserInRoom = isUserExist.rooms.includes(room);

  if (isUserInRoom) return { error: "This user is already in the room" };

  // add room to the user object
  isUserExist.rooms.push(room);

  // replace old user object with new user object

  const userIndex = users.findIndex((user) => user.username);

  users[userIndex] = isUserExist;

  return { username };
};
