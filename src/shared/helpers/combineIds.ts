export const combineIds = (currentUserId: string, userId: string) => {
  return currentUserId > userId ? currentUserId + userId : userId + currentUserId;
};
