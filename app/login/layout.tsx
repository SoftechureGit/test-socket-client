
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// export default function Page() {

  return (
<main>
    {children}
</main>
  )
}
