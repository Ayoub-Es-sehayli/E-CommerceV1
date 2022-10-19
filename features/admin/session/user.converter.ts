import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import UserModel from "./user.model";

const UserConverter: FirestoreDataConverter<UserModel> = {
  toFirestore(user: WithFieldValue<UserModel>): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): UserModel {
    return {
      admin: snapshot.data().admin,
    };
  },
};

export default UserConverter;
