// example.ts

// use source maps when printing errors:
import "source-map-support/register"

// a small example program to show that it is working
import os from "os"

console.log(`You are running a ${os.arch()} architecture!`);