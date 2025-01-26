import Side from './Side'
import Nav from './Nav'

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <aside className="border-default-50 border-r w-[200px] min-w-[200px] max-w-[200px] h-full">
        <Side />
      </aside>
      <div className="w-[calc(100vw-200px)]">
        <Nav />
        <main className="h-[calc(100vh-65px)]">{children}</main>
      </div>
    </div>
  )
}

export default Shell
