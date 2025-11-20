export const metadata = {
  title: 'SC6000M 3D Render',
  description: 'Hyper-realistic 3D render of Pioneer DJ SC6000M',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
