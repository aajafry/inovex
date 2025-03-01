/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

export default function Column({ title, orders, id }) {
  const bg =
    title === "Ongoing"
      ? "bg-slate-500"
      : title === "Process"
      ? "bg-purple-500"
      : "bg-green-500";
  return (
    <Box className="flex-1">
      <Box
        className={`${bg} text-white flex justify-between px-4 rounded-md shadow-md items-center font-medium py-2`}
      >
        <Typography>{title}</Typography>
        <Typography className="w-6 h-6 rounded-md text-white bg-slate-800 flex justify-center items-center">
          {orders?.length}
        </Typography>
      </Box>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Box
            className="bg-slate-200"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {orders?.map((order, index) => (
              <Card key={index} index={index} order={order} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}
