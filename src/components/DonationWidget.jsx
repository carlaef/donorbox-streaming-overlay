import React, { useState } from 'react';
import { useEventSource, useEventSourceListener } from 'react-use-event-source-ts'
import { useTimeoutCallback } from '@react-hook/timeout';
import Confetti from 'react-dom-confetti';

import './Widget.css'

export default function DonationWidget() {
  const [message, setMessage] = useState({});
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [eventSource, eventSourceStatus] = useEventSource("api/events", true);
  const [startTimeout, resetTimeout] = useTimeoutCallback(() => {
    setVisible(false);
  }, 5000);

  const [startConfetti, resetConfetti] = useTimeoutCallback(() => {
    setConfetti(true);
  }, 10);

  useEventSourceListener(eventSource, ['donation'], evt=> {
    console.log(evt);
    setMessage(JSON.parse(evt.data));
    setVisible(true);
    setConfetti(false);
    resetConfetti();
    startConfetti();
    resetTimeout();
    startTimeout();
  }, [message, visible]);

  const config = {
    angle: 90,
    spread: 211,
    startVelocity: 17,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "1vw",
    height: "1vw",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  return (
    <div class="container">
      <div class="pad-row"></div>
      <div class="row">
        <div class="item">
          <Confetti active={confetti} config={config} />
        </div>
      </div>
      <div class="row">
        <div class="item message">
          <div class={visible ? "fade-in" : "fade-out"}>
            <span class="name">{message.name}</span> donated <span class="amount">${message.amount}!</span>
          </div>
        </div>
      </div>
      <div class="pad-row"></div>
    </div>
  );
}
