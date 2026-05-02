import React, { useEffect, useRef, useState } from 'react'

const BackgroundMusic = () => {
  const audioRef = useRef(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    
    // Attempt to play music when component mounts
    const playMusic = async () => {
      try {
        await audio.play()
        console.log('✅ Music started playing automatically')
      } catch (error) {
        console.log('❌ Autoplay was prevented:', error.message)
        console.log('👆 User interaction required to start music')
        
        // Add click listener to start music on first interaction
        const startMusicOnInteraction = () => {
          audio.play().then(() => {
            console.log('✅ Music started after user interaction')
            setHasInteracted(true)
          }).catch(err => {
            console.log('❌ Still cannot play music:', err.message)
          })
          document.removeEventListener('click', startMusicOnInteraction)
          document.removeEventListener('keydown', startMusicOnInteraction)
          document.removeEventListener('touchstart', startMusicOnInteraction)
        }
        
        document.addEventListener('click', startMusicOnInteraction)
        document.addEventListener('keydown', startMusicOnInteraction)
        document.addEventListener('touchstart', startMusicOnInteraction)
      }
    }

    playMusic()
  }, [])

  return (
    <>
      <audio
        ref={audioRef}
        src="/Nuhami - Dibo Cut F.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />
      {!hasInteracted && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          fontSize: '14px',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          🎵 Click anywhere to start music
        </div>
      )}
    </>
  )
}

export default BackgroundMusic
