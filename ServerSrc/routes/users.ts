import express from 'express'
import type { Router, Response, Request} from 'express'
import { DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'