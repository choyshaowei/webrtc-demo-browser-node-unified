import Cookies from 'js-cookie'
import { RTCPeerConnection, RTCSessionDescription } from 'isomorphic-webrtc'

const peerConnection = new RTCPeerConnection()
const offer = Cookies.getJSON('offer')
peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
peerConnection.onicecandidate = e => {
  Cookies.set('answer', peerConnection.localDescription)
}
peerConnection.ontrack = e => {
  document.getElementById('audio').srcObject = e.streams[0]
}

;(async () => {
  const answer = await peerConnection.createAnswer()
  peerConnection.setLocalDescription(answer)
})()
