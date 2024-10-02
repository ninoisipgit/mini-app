<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Ichtrojan\Otp\Otp;

class ResetPasswordNotification extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $fromEmail;
    public $mailer;
    private $otp;

    public function __construct()
    {
        $this->message = 'Use the code below to reset your password:';
        $this->subject = 'Password Reset Request';
        $this->fromEmail = 'test@gmail.com';
        $this->mailer = 'smtp';
        $this->otp = new Otp();
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $otp = $this->otp->generate($notifiable->email, 'numeric', 6, 15);
        return (new MailMessage)
            ->mailer('smtp')
            ->subject($this->subject)
            ->line($this->message)
            ->line("Code: " . $otp->token)
            ->line('Thank you for using our application!') // Custom closing statement
            ->salutation('');
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
