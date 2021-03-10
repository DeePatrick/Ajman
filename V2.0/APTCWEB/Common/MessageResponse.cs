using APTCWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APTCWEB.Common
{
    public static class MessageResponse
    {
        public static MessageModel Message(string type, string message, string id = null)
        {
            MessageModel messageModel = new MessageModel();
            messageModel.ResponseMessage = message;
            messageModel.Id = id;
            messageModel.ResponseType = type;
            switch (type)
            {
                case "Conflict":
                    messageModel.StatusCode = "409";
                    messageModel.IsSuccess = false;
                    break;
                case "BadRequest":
                    messageModel.StatusCode = "400";
                    messageModel.IsSuccess = false;
                    break;
                case "OK":
                    messageModel.StatusCode = "200";
                    messageModel.IsSuccess = true;
                    break;
                case "NotFound":
                    messageModel.StatusCode = "404";
                    messageModel.IsSuccess = true;
                    break;
                case "InternalServerError":
                    messageModel.StatusCode = "500";
                    messageModel.IsSuccess = false;
                    break;
            }
            return messageModel;
        }
    }
}