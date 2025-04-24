
const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  audio.volume = 0.5;
  
  try {
    audio.play().catch(error => {
      console.log('Error playing notification sound:', error);
    });
  } catch (error) {
    console.log('Error creating audio:', error);
  }
};

export { playNotificationSound };
