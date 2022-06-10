<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function homepage()
    {
        $categories = Category::isShow()->get();
        $popularPosts = Post::with('images', 'category')->isApproved()->isPopular()->get();

        return view('client.home.index', compact('categories', 'popularPosts'));
    }

    public function postDetails($categorySlug, $postSlug)
    {
        $categories = Category::isShow()->get();
        $post = Post::isApproved()->isPopular()
            ->where('slug', $postSlug)->first();

        return view('client.post.post-details', compact('categories', 'post'));
    }
}