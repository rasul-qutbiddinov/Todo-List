// import { useMutation } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { api } from "../../lib/api";
// import { useNavigate } from "react-router-dom";
// import { IAuthTypes } from "../../types";

// const Auth = () => {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();

//   const login = useMutation({
//     mutationFn: async (data: IAuthTypes) => {
//       const response = await api.post("auth/login", data);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       console.log(data);
//       localStorage.setItem("accessToken", data.access_token);
//       navigate("/");
//     },
//     onError: (err) => {
//       const error = err as Error;
//       console.log(error.message);
//     },
//   });

//   const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };

//   const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const data: IAuthTypes = { username, password };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     login.mutate(data);

//     console.log({ username, password });
//   };

//   return (
//     <div className="flex h-screen w-full items-center justify-center">
//       <div className="w-full">
//         <form
//           className="mx-auto w-full max-w-[50%] rounded-2xl border-1 border-slate-200 p-10"
//           onSubmit={onSubmit}
//         >
//           <h2 className="mb-6 text-center text-3xl">Login</h2>
//           <div className="mb-5">
//             <label
//               htmlFor="username"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Your username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               placeholder="name@flowbite.com"
//               required
//               value={username}
//               onChange={handleUsername}
//             />
//           </div>
//           <div className="mb-5">
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Your password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//               required
//               value={password}
//               onChange={handlePassword}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Auth;
