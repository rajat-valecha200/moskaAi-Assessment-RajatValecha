import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <head>
        <title>Customer Data</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
