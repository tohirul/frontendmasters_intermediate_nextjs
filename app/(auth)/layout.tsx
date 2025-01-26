const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="mx-auto w-full max-w-[400px]">{children}</div>
    </div>
  )
}

export default AuthLayout
