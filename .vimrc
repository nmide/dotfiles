set nocompatible              " required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" Add all your plugins here (note older versions of Vundle used Bundle instead of Plugin)


" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required

" code folding
"set foldmethod=indent
"set foldlevel=99

" use spacebar for folding
"nnoremap <space> za

" Python indenting
set tabstop=4
set softtabstop=4
set shiftwidth=4
set textwidth=79
set expandtab
set autoindent
set fileformat=unix


" Plugins
"Bundle 'Lokaltog/powerline', {'rtp': 'powerline/bindings/vim/'}
Bundle 'tpope/vim-fugitive'
Bundle 'scrooloose/nerdtree'
Bundle 'klen/python-mode'
Bundle 'davidhalter/jedi-vim'
Bundle 'vim-airline/vim-airline'
Bundle 'altercation/solarized'
Bundle 'majutsushi/tagbar'

" Powerline setup
 set guifont=DejaVu\ Sans\ Mono\ for\ Powerline\ 9
 set laststatus=2

" F2 key for nerdtree
map <F2> :NERDTreeToggle<CR>  

" F3 key for tagbar
map <F3> :TagbarToggle<CR>
" Python-mode
let g:pymode_rope = 0
"
" " Documentation
let g:pymode_doc = 1
let g:pymode_doc_key = 'K'
set foldlevelstart=10
"
" "Linting
let g:pymode_lint = 1
let g:pymode_lint_checker = "pyflakes,pep8"
" " Auto check on save
"
" " Support virtualenv
"
" " Enable breakpoints plugin
"
" " syntax highlighting

" " Don't autofold code


" Colors:
syntax enable
set background=dark
colorscheme CodeFactoryv3

"let g:solarized_termcolors=256


" syntax enable
" set background=light
" colorscheme solarized
"
" For swapping based on GUI:
" if has('gui_running')
"     set background=light
"     else
"         set background=dark
"         endif

