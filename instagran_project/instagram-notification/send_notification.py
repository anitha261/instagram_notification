import random
import firebase_admin
from firebase_admin import credentials, messaging

# Initialize Firebase Admin
cred = credentials.Certificate("F:\key\generate key instagram.json")  # Replace with your service account key file path
firebase_admin.initialize_app(cred)

def get_random_instagram_notification():
    """
    Returns a random Instagram-like notification.
    """
    notifications = [
        "user1 liked your photo",
        "user2 sent you a friend request",
        "user3 started a live video",
        "user4 commented on your post",
        "user5 tagged you in a photo",
        "user6 shared your post",
        "user7 followed you",
        "user8 sent you a message",
    ]
    return random.choice(notifications)


def send_notification(token, title, body):
    """
    Sends a push notification to a device using FCM.
    """
    try:
        # Create the notification payload
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            token=token,  # Target device's FCM token
        )

        # Send the notification
        response = messaging.send(message)
        print("Successfully sent message:", response)
        return response

    except Exception as e:
        print("Error sending message:", e)
        return None


if __name__ == "__main__":
    # Replace with the target device's FCM token
    fcm_token = "d2qO6bF4voaCWGz0V:APA91bHe9eLUY3y_SIdtHnM73ZacKBFmaCp7UNk93hB-HEdubvUIbo5y7nl_d5_5AcX78PS8H5n8vWLg1ALBcOxm3Y8wJ0MMDpYv7Gs2Njoqz7mHnL8i9MQ"

    # Generate a random Instagram-like notification
    notification_body = get_random_instagram_notification()
    notification_title = "Instagram Notification"

    # Send the notification
    send_notification(fcm_token, notification_title, notification_body)
