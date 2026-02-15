import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
// นำเข้าไฟล์ CSS ที่เราจะสร้างในขั้นตอนต่อไป
import './App.css';
// นำเข้ารูปภาพ (ตรวจสอบ path ให้ถูกต้องนะครับ)
import bouquetImg from './assets/bouquet.jpg';
// นำเข้าไฟล์เสียง My Melody Birthday Song
import melodyAudio from './assets/My Melody Birthday Song.mp3';

function App() {
  // state สำหรับตรวจสอบว่าเปิดกล่องหรือยัง
  // false = ยังไม่เปิด (เห็นกล่อง), true = เปิดแล้ว (เห็นดอกไม้)
  const [isOpen, setIsOpen] = useState(false);
  
  // useRef เพื่อควบคุม audio element
  const audioRef = useRef(null);

  // ฟังก์ชันเมื่อคลิกที่กล่อง
  const handleOpenBox = () => {
    // 1. เปลี่ยนสถานะเป็นเปิด
    setIsOpen(true);
    // 2. เรียกฟังก์ชันยิงพลุ
    fireConfetti();
    // 3. เล่นเสียง My Melody
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // ฟังก์ชันสำหรับรีเซ็ตกลับไปหน้าแรก
  const handleReset = () => {
    setIsOpen(false);
    // หยุดเสียงเมื่อปิดกล่อง
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // ฟังก์ชันยิงพลุกระดาษ (Confetti)
  const fireConfetti = () => {
    // ยิงพลุแบบ "School Pride" (พุ่งจากสองข้าง)
    const end = Date.now() + 15 * 1000; // ยิงนาน 15 วิ (ถ้านานไปแก้ตัวเลขได้)

    // สีของกระดาษ (ธีมชมพู/แดง/ทอง)
    const colors = ['#ff69b4', '#ff1493', '#d81b60', '#ffd700'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    // ใช้ container หลักสีชมพู
    <div className="main-container">
      
      {/* ส่วนเนื้อหาที่จะเปลี่ยนไปตาม state isOpen */}
      <div className="content-wrapper">
        
        {!isOpen ? (
          /* --- หน้าจอที่ 1: กล่องของขวัญ (แสดงเมื่อ isOpen = false) --- */
          <div className="gift-box-container" onClick={handleOpenBox}>
            {/* กล่องของขวัญ */}
            <div className="gift-box shaking">
              <div className="gift-box-body">
                <div className="gift-box-lid"></div>
              </div>
            </div>
            <p className="click-instruction">แตะเพื่อเปิด</p>
          </div>
        ) : (
          /* --- หน้าจอที่ 2: ช่อดอกไม้ (แสดงเมื่อ isOpen = true) --- */
          // ใช้ class 'popping-in' เพื่อให้มี animation เด้งขึ้นมา
          <div className="flower-reveal-container popping-in">
            <h1 className="title">Happy Valentine's Day 💖</h1>
            
            {/* กรอบรูปโพลารอยด์ */}
            <div className="polaroid-frame">
              <img src={bouquetImg} alt="My sweet bouquet" className="flower-image" />
            </div>
            
            <p className="message">
        
            </p>

            {/* ปุ่มเล่นอีกรอบ */}
            <button className="reset-button" onClick={handleReset}>
               เก็บใส่กล่อง
            </button>
          </div>
        )}
      </div>

      {/* Audio element ซ่อนไว้ */}
      <audio ref={audioRef} src={melodyAudio}></audio>
    </div>
  );
}

export default App;
