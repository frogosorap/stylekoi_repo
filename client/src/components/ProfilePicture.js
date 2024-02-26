import React from 'react';

const ProfilePicture = ({ profilePhotoUrl }) => {
    return (
        <img
            src={profilePhotoUrl}
            alt="User Profile Picture"
            style={{ borderRadius: '50%', height: '50px', width: '50px'}}
        />
    )
}

export default ProfilePicture