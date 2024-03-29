import { useCallback, useMemo } from 'react';
import { generateRandomName } from './randomName';
import { resolveSetter, TSetter, TStore, useLocalStorageStore } from './stores';

import { generateInsecureRandomId } from '~/core/insecureRandomId';
import { TProfile } from '~/core/types';

export type TProfilesStore = TStore<TProfile[]>;
export type TProfileStore = TStore<TProfile>;

const initialProfiles: TProfile[] = [
  {
    id: generateInsecureRandomId(),
    name: 'My Profile',
    postingAsName: generateRandomName(),
    postingAsNameIsTemporary: true,
    favouriteDiceRolls: [],
  },
];

export const useProfilesStore = (): TProfilesStore => {
  return useLocalStorageStore('profiles', initialProfiles, {
    version: 2,
    migrate: (oldProfiles, oldVersion) => {
      return (oldProfiles as TProfile[]).map((oldProfile) => {
        let profile = oldProfile;

        // Version 2: Add favouriteDiceRolls
        if (oldVersion < 2) {
          profile = {
            ...profile,
            favouriteDiceRolls: [],
          };
        }

        return profile;
      });
    },
  });
};

export const transformProfileById = (
  profilesStore: TProfilesStore,
  profileId: string,
  transform: (profile: TProfile) => TProfile
): void => {
  profilesStore.set((profiles) =>
    profiles.map((profile) =>
      profile.id === profileId ? transform(profile) : profile
    )
  );
};

export const useCurrentProfileStore = (
  profileStore: TProfilesStore
): TProfileStore => {
  const currentProfileIdStore = useLocalStorageStore<string>(
    'currentProfileId',
    initialProfiles[0].id
  );

  const currentProfile = useMemo(() => {
    const currentProfileId = currentProfileIdStore.get();
    const profiles = profileStore.get();
    const maybeCurrentProfile = profiles.find(
      ({ id }) => id === currentProfileId
    );
    return maybeCurrentProfile || profiles[0];
  }, [currentProfileIdStore, profileStore]);

  const setCurrentProfile = useCallback(
    (profile: TSetter<TProfile>) => {
      const { id: newId, ...newProfileProps } = resolveSetter(
        profile,
        currentProfile
      );

      if (newId !== currentProfile.id) {
        currentProfileIdStore.set(newId);
      }

      transformProfileById(profileStore, newId, (profile) => ({
        ...profile,
        ...newProfileProps,
      }));
    },
    [currentProfile, currentProfileIdStore, profileStore]
  );

  return useMemo(
    () => ({
      get: () => currentProfile,
      set: setCurrentProfile,
      use: () => [currentProfile, setCurrentProfile],
    }),
    [currentProfile, setCurrentProfile]
  );
};
