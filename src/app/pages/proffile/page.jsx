"use client"
import { useTheme } from '@/components/theme'
import { useGetUserInfoQuery } from '@/store/services/userApi'
import React from 'react'

const Proffile = () => {
  const { darkMode } = useTheme()
  let userProfile = null
  userProfile = JSON.parse(localStorage.getItem("user"))  

  const { data: users, isLoading, error } = useGetUserInfoQuery()
  const user = users?.find(e => e.id == userProfile?.id)

  if (isLoading) return <div className="text-center mt-10">⏳ Loading...</div>
  if (error) return <div className="text-center mt-10 text-red-500">❌ Error loading user info</div>

  return (
    <div
      className={`flex justify-center items-center min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-2xl shadow-xl rounded-2xl overflow-hidden transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Обложка */}
        <div
          className={`h-32 ${
            darkMode
              ? "bg-gradient-to-r from-purple-700 to-indigo-800"
              : "bg-gradient-to-r from-blue-500 to-indigo-600"
          }`}
        ></div>

        {/* Аватар + Имя */}
        <div className="flex flex-col items-center -mt-12">
          <div
            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center text-white text-3xl font-bold shadow-md ${
              darkMode ? "bg-purple-600 border-gray-800" : "bg-blue-400 border-white"
            }`}
          >
            {user?.userName?.[0] || "U"}
          </div>
          <h2 className="mt-3 text-2xl font-semibold">{user?.userName}</h2>
          <span
            className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
              user?.status === "senior"
                ? darkMode
                  ? "bg-green-900 text-green-300"
                  : "bg-green-100 text-green-700"
                : darkMode
                ? "bg-blue-900 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user?.status || "Unknown"}
          </span>
        </div>

        {/* Основная информация */}
        <div className={`p-6 grid grid-cols-2 gap-4 border-t mt-6 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <div>
            <p className="text-gray-500 text-sm">ID</p>
            <p className="font-medium">{user?.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Password</p>
            <p className="font-medium">{user?.password}</p>
          </div>
        </div>

        {/* Задачи */}
        <div className={`p-6 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <h3 className="text-lg font-semibold mb-3">Tasks</h3>
          {user?.task?.length ? (
            <div className="space-y-4">
              {user.task.map((task, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl shadow-sm transition-colors ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <p><span className="font-medium">Task ID:</span> {task.taskMadeId}</p>
                  <p><span className="font-medium">Task Name:</span> {task.taskMadeName || <i>No name</i>}</p>

                  {task.taskResult?.map((res, i) => (
                    <div
                      key={i}
                      className={`mt-3 p-3 rounded-lg border shadow-sm transition-colors ${
                        darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
                      }`}
                    >
                      <p><span className="font-medium">Result ID:</span> {res.taskMaxMadeId || "-"}</p>
                      <p><span className="font-medium">Result Name:</span> {res.taskMaxMadeName || "-"}</p>
                      <p><span className="font-medium">Result:</span> {res.taskMaxMadeResult || "-"}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No tasks assigned</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Proffile
