import Image from 'next/image';

const ProfileImage = () => {
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
      <Image
        src="/bigjump.jpg"
        alt="Profile"
        layout="fill"
        objectFit="cover"
        style={{
          borderRadius: '50%',
          animation: 'rotate 50s linear infinite',
        }}
        onLoad={() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const imgElement = document.querySelector('img');
              if(imgElement){
                imgElement.style.animation = 'rotate 50s linear infinite';
              }
            });
          });
        }}
      />
    </div>
  );
};

export default ProfileImage;