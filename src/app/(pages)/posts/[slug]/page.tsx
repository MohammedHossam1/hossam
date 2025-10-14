// // src/pages/PostDetails.tsx
// import { useParams } from "react-router-dom";
// import { posts } from "@/data/postsData";

// export default function PostDetails() {
//   const { id } = useParams();
//   const post = posts.find(p => p.id === id);

//   if (!post) return <div className="p-8 text-center">Post not found</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4">
//         <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
//         <p className="text-gray-600 mb-6">{post.description}</p>

//         <div className="aspect-video">
//           <iframe
//             src={post.linkedinUrl}
//             width="100%"
//             height="500"
//             frameBorder="0"
//             className="w-full rounded-xl"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// }
