import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [123456],
      dislikedBy: [],
    },
    comments: [
      {
        cId:1,
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        comment: "whent did you click this?"
      },
      {
        cId:2,
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "Pretty Good"
      }
    ],
    userId: 123457,
    username: "znmdbKabir",
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img: "https://images.unsplash.com/photo-1475694867812-f82b8696d610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    trending: 1,

  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [123456,123457],
      dislikedBy: [],
    },
    comments: [
      {
        cId:1,
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        comment: "This place looks heaven"
      },
      {
        cId:2,
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "we should all go here together sometime"
      }
    ],
    userId: 123457,
    username: "znmdbKabir",
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img: "https://images.unsplash.com/photo-1620827195512-6422baa0c5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    trending: 1,

  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [123456,123455],
      dislikedBy: [],
    },
    comments: [
      {
        cId:1,
        _id: 123456,
        firstName: "Arjun",
        lastName: "Saluja",
        username: "znmdbArjun",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jId77e-_UacKGYH7tOGXozndUaZMh75H0A",
        comment: "Is that japan"
      },
      {
        cId:2,
        _id: 123455,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "That's bangalore"
      }
    ],
    userId: 123458,
    username: "znmdbImaran",
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img:"https://images.unsplash.com/photo-1586716492684-6d2c2f100edc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80",
    trending: 1,

  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [123456],
      dislikedBy: [],
    },
    comments: [
      {
        cId:2,
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "Pretty good"
      }
    ],
    userId: 123458,
    username: "znmdbImaran",
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img: "https://images.unsplash.com/photo-1597073642928-48c0971f7ded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    trending: 1,

  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [ 123458,123457,123456],
      dislikedBy: [],
    },
    comments: [
      {
        cId:1,
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        img:"https://cdn.personalitylist.com/avatars/140645.png",
        comment: "whent did you click this?"
      },
      {cId:2,
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "Pretty Good"
      }
    ],
    username: "znmdbArjun",
    userId: 123456,
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img: "https://images.unsplash.com/photo-1547908771-05259d82e2df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    trending: 1
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [123458,123457],
      dislikedBy: [],
    },
    comments: [
      {
        cId:1,
        _id: 123458,
        firstName: "Imaran",
        lastName: "Qureshi",
        username: "znmdbImaran",
        img:"https://cdn.personalitylist.com/avatars/140645.png",
        comment: "I should definitely with this place sometimes"
      },
      {cId:2,
        _id: 123457,
        firstName: "Kabir",
        lastName: "Dewan",
        username: "znmdbKabir",
        img: "https://static1.personality-database.com/profile_images/91cd2f9847b2477082a3fbf9da55c8d9.png",
        comment: "noice"
      }
    ],
    username: "znmdbArjun",
    userId: 123456,
    createdAt: '07/07/2023',
    updatedAt: '07/07/2023',
    img: "https://images.unsplash.com/photo-1554995329-c1561a77679f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
    trending: 2
  },
];
