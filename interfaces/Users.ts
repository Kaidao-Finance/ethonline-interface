export interface Users {
  twitterUid: String;
  twitterName: String;
  walletAddress: String;
  NFTCollections: String[];
  profilePictureUrl: String;
  position: any; //todo: fix to mongo schema
  message: String;
  isOnline: Boolean;
}
