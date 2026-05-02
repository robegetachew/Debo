import React, { useState } from 'react'
import './ExplorePage.css'

const ExplorePage = ({ onExplore }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleExplore = async () => {
    setIsLoading(true)
    
    // Play music first
    try {
      const audio = new Audio('/Nuhami - Dibo Cut F.mp3')
      audio.loop = true
      await audio.play()
      
      // Store audio reference globally so it keeps playing
      window.backgroundMusic = audio
      
      // Small delay for smooth transition
      setTimeout(() => {
        onExplore()
      }, 500)
    } catch (error) {
      console.log('Music play failed:', error)
      // Still navigate even if music fails
      onExplore()
    }
  }

  return (
    <div className="explore-container">
      <div className="explore-content">
        <div className="explore-text">
          <h1>Abu & Dibo</h1>
          <p className="wedding-date">Are Getting Married</p>
          {/* <div className="divider">💍</div>  */}
          <p className="invitation-text">You're joyfully invited to celebrate our special day</p>
        </div>
        
        <button 
          className="explore-button"
          onClick={handleExplore}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-text">Opening...</span>
          ) : (
            <span className="button-text">
              {/* <span className="music-icon">🎵</span> */}
             Open Invitation
            </span>
          )}
        </button>
        
        {/* <p className="hint-text">Click to begin the celebration with music</p> */}
      </div>
      
      <div className="background-overlay"></div>
    </div>
  )
}

export default ExplorePage
