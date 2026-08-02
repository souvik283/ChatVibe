const keyStrokeSounds = [
  new Audio("/sound/keystroke1.mp3"),
  new Audio("/sound/keystroke2.mp3"),
  new Audio("/sound/keystroke3.mp3"),
  new Audio("/sound/keystroke4.mp3"),
  new Audio("/sound/keystroke5.mp3"),
  new Audio("/sound/keystroke6.mp3"),
];

const useKeyBoardSound = () => {
  const playRandomKeyStroke = () => {
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

    randomSound.currentTime = 0;
    randomSound
      .play()
      .catch((error) => console.log("Audio play failed: ", error));
  };

  return { playRandomKeyStroke };
};

export default useKeyBoardSound;
