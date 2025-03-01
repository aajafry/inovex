/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ order, index }) {
  return (
    <Draggable draggableId={`${order?._id}`} key={order?._id} index={index}>
      {(provided, snapshot) => (
        <Box
          className="my-2 p-2 cursor-grab shadow-md rounded-md bg-slate-100"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Box className="flex justify-start">#{order?._id.slice(0, 6)}</Box>

          <Box className="flex justify-center">
            <Typography>{order?.service?.name}</Typography>
          </Box>
          <Box className="flex justify-between items-center gap-2">
            <Avatar className=" h-8 w-8" onClick={() => console.log(order)} />
            <Box className=" font-light flex-nowrap">
              {order?.status}
              {"  "}
              {moment(order?.createdAt).format("MMM DD, YYYY")}
            </Box>
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Draggable>
  );
}
