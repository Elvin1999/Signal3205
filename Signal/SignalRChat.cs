using Microsoft.AspNetCore.SignalR;

namespace Signal
{
    public class SignalRChat:Hub
    {
        public async Task SendMessage(string user,string message)
        {
            await Clients.Others.SendAsync("ReceiveMessage", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            
            string info = " connected successfully";
            await Clients.Others.SendAsync("Connect", info);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            string info = $"someone disconnect";
            return Clients.Others.SendAsync("DisConnect", info);
        }
    }
}
