import React, { createContext, useState } from 'react';

export interface AnnouncementContextProps {
  announcements: string[];
  setAnnouncements: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AnnouncementContext = createContext<AnnouncementContextProps | undefined>(undefined);

export const AnnouncementProvider: React.FC = ({ children }) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  return (
    <AnnouncementContext.Provider value={{ announcements, setAnnouncements }}>
      {children}
    </AnnouncementContext.Provider>
  );
};
