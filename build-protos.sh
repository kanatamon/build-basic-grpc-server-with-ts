#!/bin/bash

OUTDIR=./src/proto

mkdir -p ${OUTDIR}

# Typescript code generation
yarn run proto-loader-gen-types \
  --longs=String \
  --enums=String  \
  --defaults \
  --oneofs  \
  --grpcLib=@grpc/grpc-js \
  --outDir=${OUTDIR} \
  proto/*.proto