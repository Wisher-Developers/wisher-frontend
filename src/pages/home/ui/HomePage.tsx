import styled from "styled-components"

import { useCreatePingMutation, useLazyGetPingQuery } from "~/entites/ping/api"

export default function HomePage() {
  const [getPing, { data: recievedData, error: recievedError }] =
    useLazyGetPingQuery()

  const [createPing, { data: createdData, error: createdError }] =
    useCreatePingMutation()

  const handleGetPing = () => {
    if (!createdData) return

    getPing(createdData.id)
  }

  if (recievedError) console.error(recievedError)
  if (createdError) console.error(createdError)

  return (
    <Wrapper>
      <h1>Home</h1>

      <Action>
        <button onClick={handleGetPing}>Get Ping</button>
        <p>Last get: {recievedData?.value}</p>
      </Action>

      <Action>
        <button onClick={() => createPing()}>Create Ping</button>
        <p>Last created: {createdData?.id}</p>
      </Action>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Action = styled.div`
  display: flex;
`
