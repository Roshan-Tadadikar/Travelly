import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 123455,
    firstName: "Roshan ",
    lastName: "Tadadikar",
    username: "randomUsername",
    password: "randomUser123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [

      {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, , {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai.",
        link: "https://github.com/Roshan-Tadadikar"
      }],
    following: [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai.",
      }],
    img: "https://global-uploads.webflow.com/59dbe1c3542805000192616b/63178a7970d1b57a4c6a7a05_golden-retriever.png",
    about: "Nothing much, just a boring engineer",
    link: "https://github.com/Roshan-Tadadikar"
  },
  {
    _id: 123456,
    firstName: "Arjun",
    lastName: "Saluja",
    username: "znmdbArjun",
    password: "znmdbArjun",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",

    followers: [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }],
    following: [

      {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        followers: [123455, 123457, 123458],
        following: [123455, 123457, 123458],
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        followers: [123455, 123456, , 123458],
        following: [123455, 123456, 123458],
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        followers: [123455, 123456, , 123457],
        following: [123455, 123456, , 123457],
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai.",
        link: "https://github.com/Roshan-Tadadikar"
      }],
    about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
  },
  {
    _id: 123457,
    firstName: "Kabir",
    lastName: "Dewan",
    username: "znmdbKabir",
    password: "znmdbKabir",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
    followers: [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }
    ],
    following: [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        password: "znmdbImaran",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://cdn.personalitylist.com/avatars/140645.png",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }
    ],
    about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
  },
  {
    _id: 123458,
    firstName: "Imaran",
    lastName: "Qureshi",
    username: "znmdbImaran",
    password: "znmdbImaran",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    img: "https://cdn.personalitylist.com/avatars/140645.png",
    followers: [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {

        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
      }
    ],
    following:  [

      {
        _id: 123455,
        firstName: "Roshan ",
        lastName: "Tadadikar",
        username: "randomUsername",
        password: "randomUser123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
      }, {
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        password: "znmdbArjun",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai."
      }, {

        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        password: "znmdbKabir",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
      }
    ],
    about: "Apne kaam ko apni life ke saath confuse mat karo. Tumhara kaam tumhari life nhi, sirf uska ek hissa hai.",
    link: "https://github.com/Roshan-Tadadikar"
  }
];
