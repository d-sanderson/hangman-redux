import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../app/hooks';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

// @ts-ignore
const SplineScene = () => {
  // initialize Refs
  const post = useRef()
  const head = useRef()
  const torso = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const leftLeg = useRef()
  const rightLeg = useRef()
  const winText = useRef()
  const loseText = useRef()

  const person = useRef()

  // @ts-ignore
  function onLoad(spline) {
    const postObj = spline.findObjectById('8b383c81-04af-4020-adb7-1536919524df')
    const headObj = spline.findObjectById('197824f6-116e-4719-a466-fbfdd4fe138e')
    const torsoObj = spline.findObjectById('8571f3da-57da-4c40-8229-a43b95595db1')
    const leftArmObj = spline.findObjectById('b2d1f84c-6f60-42ac-beb9-dc5f5d5e90dc')
    const rightArmObj = spline.findObjectById('24dfd042-2286-454b-8b7b-93af446c12c6')
    const leftLegObj = spline.findObjectById('61a2dbe9-090e-4084-a0a5-5e9d0fc5bd91')
    const rightLegObj = spline.findObjectById('d1016e3c-4ebd-4163-9434-e4752d97f080')
    const winTextObj = spline.findObjectById('97d84d3a-a0d1-4553-8205-2e8853d53e71')
    const loseTextObj = spline.findObjectById('36c51c12-45e7-47c1-b974-22eeadf6ae79')
    const personObj = spline.findObjectById('25b26288-d556-484e-855a-efa5049f3c69')

    // save objects to refs for later use
    post.current = postObj
    head.current = headObj
    torso.current = torsoObj
    leftArm.current = leftArmObj
    rightArm.current = rightArmObj
    leftLeg.current = leftLegObj
    rightLeg.current = rightLegObj
    winText.current = winTextObj
    loseText.current = loseTextObj
    person.current = personObj
  }

  const hangman = useAppSelector((state) => state.hangman)
  useEffect(() => {
    switch (hangman.triesRemaining) {
      case 7: {
        // @ts-ignore
        post?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        head?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        torso?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        leftArm?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        rightArm?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        leftLeg?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
        rightLeg?.current?.emitEventReverse('mouseDown')
        // @ts-ignore
      }
      case 6:
        // @ts-ignore
        post?.current?.emitEvent('mouseDown')
        break;
      case 5:
        // @ts-ignore
        head?.current?.emitEvent('mouseDown')
        break;
      case 4:
        // @ts-ignore
        torso?.current.emitEvent('mouseDown')
        break;
      case 3:
        // @ts-ignore
        leftArm.current.emitEvent('mouseDown')
        break;
      case 2:
        // @ts-ignore
        rightArm.current.emitEvent('mouseDown')
        break;
      case 1:
        // @ts-ignore
        leftLeg.current.emitEvent('mouseDown')
        break;
      default:
      case 0: {
        // @ts-ignore
        rightLeg.current.emitEvent('mouseDown');
        // @ts-ignore
      }
        break;
    }
  }, [hangman.triesRemaining])

  // @ts-ignore
  useEffect(() => {
    if (hangman.gameState === 'lose') {
      // @ts-ignore
      loseText?.current?.emitEvent('mouseDown')
    }
    if (hangman.gameState === 'win') {
      // @ts-ignore
      winText?.current?.emitEvent('mouseDown')
    }
    if (hangman.gameState === 'inactive') {
      // @ts-ignore
      winText?.current?.emitEventReverse('mouseDown')
      // @ts-ignore
      loseText?.current?.emitEventReverse('mouseDown')

    }
  }, [hangman.gameState])

  return (
    <div className="preferably-square">
      <Spline scene="https://prod.spline.design/wKAJmeCkipY2gbK2/scene.splinecode" onLoad={onLoad} />
    </div>
  )
}

export default SplineScene