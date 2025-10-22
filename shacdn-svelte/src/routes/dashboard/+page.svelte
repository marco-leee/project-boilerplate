<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<Button onclick={() => toast("Hello world")}>Show toast</Button>
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
	</div>
	<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
	</div>
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
	</div>
	<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
		<div class="aspect-video rounded-xl bg-muted/50"></div>
	</div>
	<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>

	<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>

</div>
