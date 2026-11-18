import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('fashion_ai_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse profile from local storage', e);
    }
    // Default empty profile
    return {
      unit: 'metric',
      shape: '',
      skinTone: '',
      preferences: [],
      fit: '',
      measurements: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('fashion_ai_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (newData) => {
    setProfile(prev => ({ ...prev, ...newData }));
  };

  const clearProfile = () => {
    const emptyProfile = {
      unit: 'metric',
      shape: '',
      skinTone: '',
      preferences: [],
      fit: '',
      measurements: {}
    };
    setProfile(emptyProfile);
    localStorage.removeItem('fashion_ai_profile');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
