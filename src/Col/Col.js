import Box from '../Box'


export default function Col (props) {
  return Box({pr: true, fluid: true, ...props})
}
