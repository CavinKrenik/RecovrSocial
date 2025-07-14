import React from 'react';
import UpdatedSocialFeed from './UpdatedSocialFeed';

interface UpdatedRecoveryFeedProps {
  userNickname: string;
}

const UpdatedRecoveryFeed: React.FC<UpdatedRecoveryFeedProps> = ({ userNickname }) => {
  return <UpdatedSocialFeed />;
};

export default UpdatedRecoveryFeed;