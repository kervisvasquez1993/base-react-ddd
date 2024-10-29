import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className='bg-card py-4 mt-auto'>
      <div className='container mx-auto text-center text-muted'>
        <p>© {new Date().getFullYear()} Quiz Game. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
