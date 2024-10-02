<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $fromAddress;
    public $subject;
    public $body;

    public function __construct($from, $subject, $body)
    {
        $this->fromAddress = $from;
        $this->subject = $subject;
        $this->body = $body;
    }

    public function build()
    {
        return $this->from($this->fromAddress)
            ->subject($this->subject)
            ->view('emails.custom') // Specify the view for the email
            ->with(['body' => $this->body]);
    }
}
