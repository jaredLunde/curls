// This file is for setting up Jest test environments
import * as emotion from '@emotion/core'
import {createSerializer} from 'jest-emotion'

expect.addSnapshotSerializer(createSerializer(emotion))